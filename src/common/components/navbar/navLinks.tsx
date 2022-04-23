import routes from "../../routes/routes";

export const navLinks = [
    {
        title: "FileButler | Online tool for files",
        name: "Home",
        path: routes.HOME
    }, {
        title: "Merge PDF files online. Free PDF-merger.",
        name: "Merge PDF",
        path: routes.MERGEPDF,
    },
    {
        title: "Extract text from image. Extract text from any image",
        name: "Extract text",
        path: routes.EXTRACTTEXT
    },

    {
        name: "Contact Us",
        path: "#contact",
    },
];