export const aboutController = {
    index: {
        handler: async function (request, h) {
            return h.view("aboutpage", { title: "About Placemarkmap"});
        },
    },
};