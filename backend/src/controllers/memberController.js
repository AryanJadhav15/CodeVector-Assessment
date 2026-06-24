import MemberModel from "../models/member.js";

export const getMembers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }

        console.log({ page, limit, skip, query });

        const members = await MemberModel.find(query)
            .sort({ joinDate: -1 })
            .skip(skip)
            .limit(limit);

        const totalMembers = await MemberModel.countDocuments(query);
        const totalPages = Math.ceil(totalMembers / limit);
        const currentPage = page;

        res.status(200).json({
            success: true,
            totalPages: totalPages,
            totalMembers: totalMembers,
            currentPage: currentPage,
            members,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
