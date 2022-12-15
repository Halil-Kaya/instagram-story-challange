import { closeMongoDb, connectMongoDb } from "../../common/db/mongo.helper";
import { closeRedis, connectRedis } from "../../common/db/redis.helper";
import { closePostgresqlDb, connectPostgresqlDb } from "../../common/db/postgresql.helper";
import { loginWithTestUser } from "../../common/auth.helper";
import { StoryCreateDto } from "../../../apps/gateway/src/modules/story/dto";
import { createStory, fetchStoriesWithPagination } from "../../common/story.helper";
import { isSorted, sleep } from "../../common";
import { IStory, PaginatedResponse } from "@app/interfaces";

afterAll(async () => {
	await Promise.all([closeMongoDb(), closeRedis(), closePostgresqlDb()]);
});

beforeEach(async () => {
	await Promise.all([connectRedis(), connectMongoDb(), connectPostgresqlDb()]);
});

it("should fetch stories with pagination", async () => {
		const token = await loginWithTestUser();

		for(let i = 0 ; i<50 ;i++){
			const createStoryDto: StoryCreateDto = {
				title: `#title-${i}`,
				content: `#content-${i}`
			};
			await createStory(token, createStoryDto);
			await sleep(50)
		}

		const totalItems : IStory[] = []

		for(let i = 0; i < 10;i++){
				const pageResult = await fetchStoriesWithPagination(token,{limit : 5,page : i})
				const page = <PaginatedResponse<IStory>>pageResult.data.result
				expect(page.pagination.totalPageCount).toBe(10)
				expect(page.pagination.limit).toBe(5)
				expect(page.pagination.current).toBe(i)
				expect(page.items.length).toBe(5)
				totalItems.push(...page.items)
		}
		expect(totalItems.length).toBe(50)
		expect(isSorted(totalItems.map(story => +story.id))).toBeTruthy()
});

it("should not fetch stories if page is wrong", async ()=> {
		const token = await loginWithTestUser();
		for(let i = 0 ; i<10 ;i++){
			const createStoryDto: StoryCreateDto = {
				title: `#title-${i}`,
				content: `#content-${i}`
			};
			await createStory(token, createStoryDto);
			await sleep(50)
		}
		const pageResult = await fetchStoriesWithPagination(token,{limit : 5,page : 100})
		const page = <PaginatedResponse<IStory>>pageResult.data.result
		expect(page.pagination.totalPageCount).toBe(2)
		expect(page.pagination.limit).toBe(5)
		expect(page.pagination.current).toBe(100)
		expect(page.items.length).toBe(0)
});