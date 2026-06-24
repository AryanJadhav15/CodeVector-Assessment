import { faker } from "@faker-js/faker";
import MemberModel from "../models/member.js";
import connectDB from "../config/mongoDB.js";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";

dotenv.config();

const categories = ["Basic", "Premium", "Elite"];
const durations = [1, 3, 6, 12];

const membershipPlans = {
    Basic: {
        1: 2000,
        3: 5500,
        6: 10000,
        12: 15000,
    },
    Premium: {
        1: 3000,
        3: 7500,
        6: 12000,
        12: 17000,
    },
    Elite: {
        1: 3500,
        3: 8000,
        6: 15000,
        12: 20000,
    },
};

const createMember = () => {
    const category = faker.helpers.arrayElement(categories);
    const duration = faker.helpers.arrayElement(durations);

    return {
        name: faker.person.fullName(),
        email: `${faker.string.uuid()}@gmail.com`,
        category,
        duration,
        price: membershipPlans[category][duration],
        joinDate: faker.date.past(),
    };
};

const seedMembers = async () => {
    await connectDB();

    const TOTAL_MEMBERS = 200000;
    const BATCH_SIZE = 10000;

    for (let i = 0; i < TOTAL_MEMBERS; i += BATCH_SIZE) {
        const members = Array.from({ length: BATCH_SIZE }, createMember);

        try {
            await MemberModel.insertMany(members, {
                ordered: false,
            });
        } catch (error) {
            console.log(error);
        }
    }

    console.log("Seeding Completed");
};

seedMembers();

const count = await MemberModel.countDocuments()
console.log(count);


