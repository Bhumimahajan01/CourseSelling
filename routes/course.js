const { Router } = require('express');
const courseRouter = Router();
const { userMiddleware } = require("../middlewares/auth");
const { courseModel, learningPathModel } = require("../db");

courseRouter.use(userMiddleware);

const courseConfigs = {
    web_development: {
        beginner: {
            description: "Beginner",
            roadmapImage: "https://i.ibb.co/2YzZQ1L/img1.jpg",
            resources: [
                // #INTRODUCTION
                [
                    { title: "What is Web Development?", url: "https://www.geeksforgeeks.org/web-development/", description: "An introduction to web development." },
                    { title: "Front-End vs Back-End basics", url: "https://www.computerscience.org/bootcamps/resources/frontend-vs-backend/", description: "Learn about the roles of front-end and back-end development." }
                ],

                // #HTML
                [
                    { title: "HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics", description: "Learn the basics of HTML for web development." },
                    { title: "Structuring the Web", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", description: "A guide on how to structure web pages using HTML." }
                ],

                // #CSS
                [
                    { title: "Styling with CSS", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS", description: "Basics of styling web pages with CSS." },
                    { title: "Flexbox Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox", description: "An introduction to CSS Flexbox for layout." },
                    { title: "Flexbox - The Odin Project", url: "https://www.theodinproject.com/lessons/foundations-introduction-to-flexbox", description: "A comprehensive guide to Flexbox." },
                    { title: "CSS Grid Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids", description: "Learn about CSS Grid layout system." },
                    { title: "Responsive Design", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", description: "Create responsive web designs." }
                ],

                // #JAVASCRIPT
                [
                    { title: "JavaScript Basics - Variables, Datatypes, and Operators", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript", description: "Learn JavaScript basics including variables and datatypes." },
                    { title: "JavaScript Variables - W3Schools", url: "https://www.w3schools.com/js/js_variables.asp", description: "A beginner guide to JavaScript variables." },
                    { title: "JavaScript Functions, Loops, and Conditionals", url: "https://www.w3schools.com/js/js_functions.asp", description: "Learn about functions, loops, and conditionals in JavaScript." },
                    { title: "DOM Manipulation", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents", description: "Manipulate web pages using the DOM." },
                    { title: "DOM Manipulation - The Odin Project", url: "https://www.theodinproject.com/lessons/foundations-dom-manipulation-and-events", description: "A practical guide to DOM manipulation." },
                    { title: "Event Handling - W3Schools", url: "https://www.w3schools.com/js/js_events.asp", description: "Learn JavaScript event handling." },
                    { title: "Event Handlers - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers", description: "Introduction to event handlers in JavaScript." },
                    { title: "JavaScript Events - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/Events", description: "JavaScript events documentation." },
                    { title: "JavaScript Events - Javatpoint", url: "https://www.javatpoint.com/javascript-events", description: "A guide to JavaScript events." }
                ],

                // #VERSION CONTROL SYSTEM - USING GIT
                [
                    { title: "Git Basics - Atlassian", url: "https://www.atlassian.com/git", description: "Introduction to Git version control." },
                    { title: "Getting a Git Repository", url: "https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository", description: "How to create a Git repository." },
                    { title: "Collaboration with GitHub - Medium", url: "https://medium.com/@jonathanmines/the-ultimate-github-collaboration-guide-df816e98fb67", description: "A guide to collaborating on GitHub." },
                    { title: "Collaborating with Git - Vicky Steeves", url: "https://vickysteeves.gitlab.io/collaborating-with-git/collaborating-with-git.html", description: "Collaboration using Git." },
                    { title: "Git Collaboration Guide", url: "https://gist.github.com/neklaf/9002d3acccf6b6e448db5c4c4e8764c0", description: "Steps for collaborating in Git." },
                    { title: "Git Push and Pull - DataCamp", url: "https://www.datacamp.com/tutorial/git-push-pull", description: "Guide to pushing and pulling in Git." }
                ],

                // #PROJECTS
                [
                    { title: "Portfolio Website Project", url: "https://www.geeksforgeeks.org/how-to-create-a-portfolio-website-using-html-css-and-javascript/", description: "Build a portfolio website using HTML, CSS, and JavaScript." },
                    { title: "Simple Landing Page Project", url: "https://www.geeksforgeeks.org/how-to-create-a-landing-page-using-html-css-and-javascript/", description: "Create a simple landing page." },
                    { title: "Static Blog Project", url: "https://www.youtube.com/watch?v=Aj7HLsJenVg", description: "Build a static blog using HTML, CSS, and JavaScript." }
                ]
            ],
            prerequisites: "NA"
        },
        intermediate: {
            description: "Intermediate",
            roadmapImage: "https://i.ibb.co/w640XJx/2.png",
            resources:  [
                 // #ADVANCED JAVASCRIPT
                 [
                    { title: "Closures, Promises and Async/Await - GeeksforGeeks", url: "https://www.geeksforgeeks.org/advanced-javascript-backend-basics/", description: "Explore closures, promises, and async/await in JavaScript." },
                    { title: "Closures, Promises and Async/Await - YouTube", url: "https://youtu.be/R9I85RhI7Cg?si=P7lsh7yL8wQATzG_", description: "Video guide to closures, promises, and async/await." },
                    { title: "Async Programming - JavaScript.info", url: "https://javascript.info/async", description: "Learn about asynchronous programming in JavaScript." },
                    { title: "JavaScript Promises - JavaScript.info", url: "https://javascript.info/promise-basics", description: "Understand the basics of promises in JavaScript." }
                ],
                [
                    { title: "Arrow Functions - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions", description: "Learn about arrow functions in JavaScript." },
                    { title: "Classes in JavaScript - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes", description: "An introduction to classes in JavaScript." },
                    { title: "Modules in JavaScript - JavaScript.info", url: "https://javascript.info/modules-intro", description: "Learn about modules in ES6+." },
                    { title: "ES6+ Overview - W3Schools", url: "https://www.w3schools.com/js/js_es6.asp", description: "Overview of ES6+ features in JavaScript." }
                ],

                // #REACT
                [
                    { title: "React Setup & Installation", url: "https://react.dev/learn/installation", description: "Setting up and installing React." },
                    { title: "JSX and Components - React.dev", url: "https://react.dev/learn/writing-markup-with-jsx", description: "Learn about JSX and components in React." },
                    { title: "State and Props - GeeksforGeeks", url: "https://www.geeksforgeeks.org/reactjs-state-vs-props/", description: "Guide to understanding state and props in React." }
                ],
                [
                    { title: "Hooks and Functional Components - Medium", url: "https://medium.com/@zachlandis91/react-hooks-and-functional-components-25a0bc00e023#:~:text=React%20Hooks%20and%20functional%20components%20have%20transformed%20how%20developers%20create,module%20that%20renders%20some%20output", description: "An overview of hooks and functional components in React." },
                    { title: "React Hooks Overview", url: "https://legacy.reactjs.org/docs/hooks-overview.html", description: "Introduction to hooks in React." },
                    { title: "Components and Props - Legacy React Docs", url: "https://legacy.reactjs.org/docs/components-and-props.html", description: "An overview of components and props." },
                    { title: "React Components - W3Schools", url: "https://www.w3schools.com/react/react_components.asp", description: "Learn about React components." }
                ],

                // #RESPONSIVE AND WEB DESIGN
                [
                    { title: "Introduction to Responsive Design - Web.dev", url: "https://web.dev/articles/accessible-responsive-design", description: "An accessible approach to responsive design." },
                    { title: "Responsive Design - Interaction Design Foundation", url: "https://www.interaction-design.org/literature/article/responsive-design-let-the-device-do-the-work?srsltid=AfmBOoptnyRgCKQ4StA6NrLiDKnU7xmCbLeys1kUY8sydXfWtycqQSF6", description: "Explore responsive design principles." }
                ],
                [
                    { title: "Bootstrap Introduction", url: "https://getbootstrap.com/docs/4.1/getting-started/introduction/", description: "Learn the basics of Bootstrap." },
                    { title: "Learn Bootstrap - Codecademy", url: "https://www.codecademy.com/learn/learn-bootstrap", description: "A Codecademy course on Bootstrap." },
                    { title: "Bootstrap Tutorial - YouTube", url: "https://youtu.be/-qfEOE4vtxE?si=ITd_hzTj7viOZLD8", description: "Video tutorial on Bootstrap basics." }
                ],
                [
                    { title: "TailwindCSS Installation", url: "https://tailwindcss.com/docs/installation", description: "Installing and using TailwindCSS." },
                    { title: "TailwindCSS Guide - GeeksforGeeks", url: "https://www.geeksforgeeks.org/tailwind-css/", description: "A guide to using TailwindCSS." },
                    { title: "Web Accessibility Basics - HubSpot Blog", url: "https://blog.hubspot.com/website/web-accessibility", description: "Basics of web accessibility following WCAG guidelines." },
                    { title: "Accessibility - MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility", description: "Learn about accessibility for the web." }
                ],

                // #NODE.JS & EXPRESS
                [
                    { title: "Setting up a Node.js Server", url: "https://runjs.app/blog/how-to-start-a-node-server", description: "Learn how to set up a Node.js server." },
                    { title: "Building RESTful APIs - AWS", url: "https://aws.amazon.com/what-is/restful-api/", description: "Guide to RESTful APIs by AWS." },
                    { title: "REST API Basics - Red Hat", url: "https://www.redhat.com/en/topics/api/what-is-a-rest-api", description: "Understanding the basics of RESTful APIs." }
                ],
                [
                    { title: "Database Basics - GeeksforGeeks", url: "https://www.geeksforgeeks.org/what-is-database/", description: "Learn about databases and how they work." },
                    { title: "Connecting Node.js to MySQL", url: "https://www.w3schools.com/nodejs/nodejs_mysql.asp", description: "Guide to connecting Node.js with MySQL." },
                    { title: "MongoDB Basics - MongoDB", url: "https://www.mongodb.com/resources/products/fundamentals/basics", description: "An introduction to MongoDB." },
                    { title: "Learn MongoDB - MongoDB University", url: "https://learn.mongodb.com/", description: "Comprehensive MongoDB learning resources." }
                ],

                // #PROJECTS
                [
                    { title: "CRUD Application Project - YouTube", url: "https://youtu.be/ayAX10M8b3Q?si=dZA7vGzn-4kq_Woy", description: "A guide to building a CRUD application." },
                    { title: "Web Development Projects - Odin School", url: "https://www.odinschool.com/blog/best-web-development-project-ideas-beginners-to-advance", description: "Web development project ideas from beginner to advanced." },
                    { title: "Intermediate Projects - GeeksforGeeks", url: "https://www.geeksforgeeks.org/web-development-projects/", description: "A list of intermediate-level web development projects." }
                ]
            ],
            prerequisites: "HTML, CSS, JavaScript, Node.js, Express.js, Git, GitHub"
        },
        advanced: {
            description: "Advanced",
            roadmapImage: "https://i.ibb.co/zHC4cfG/img3.jpg",
            resources: [{ title: "String", url: "String" }],
            prerequisites: "MERN + Deveops + Git and Git hub"
        }
    },
    dsa:{
        beginner: {
            description: "DSA Fundamentals",
            roadmapImage: "dsa_beginner_roadmap",
            resources: [{ title: "Basic Data Structures", url: "String"}, { title: "Time & Space Complexity", url: "String" }],
            prerequisites: "Basic programming knowledge in any language"
        },
        intermediate: {
            description: "Advanced Data Structures",
            roadmapImage: "dsa_intermediate_roadmap",
            resources: [{ title: "Advanced Data Structures", url: "String"},{ title: "Sorting & Searching Algorithms", url: "String" }],
            prerequisites: "Arrays, Linked Lists, Basic Algorithms, Time Complexity Analysis"
        },
        advanced: {
            description: "Complex Algorithms & Problem Solving",
            roadmapImage: "dsa_advanced_roadmap",
            resources: [{ title: "Dynamic Programming", url: "String"},{ title: "Graph Algorithms", url: "String" }],
            prerequisites: "Advanced Data Structures, Sorting Algorithms, Binary Trees, Heap, Hash Tables"
        }
    }
};
courseRouter.post("/show", async (req, res)=>{
    try{
        const userPath = await learningPathModel.findOne({ userId: req.userId });
        if(!userPath){
            return res.status(403).json({
                msg: "No such path found"
            })
        }
        const existingCourse = await courseModel.findOne({ pathId: userPath._id });
        if (existingCourse) {
            return res.status(400).json({
                msg: "A course for this learning path already exists"
            });
        }
        const path = userPath.path;
        const level = userPath.level;
        if (!courseConfigs[path] || !courseConfigs[path][level]) {
            return res.status(400).json({
                msg: "Invalid path or level configuration"
            });
        }
        const course = await courseModel.create({
            userId: req.userId,
            pathId: userPath._id,
            title: `${path} - ${level}`,
            description: courseConfigs[path][level].description,
            roadmapImage: courseConfigs[path][level].roadmapImage,
            resources: courseConfigs[path][level].resources,
            prerequisites: courseConfigs[path][level].prerequisites
        })
        return res.json({
            courseId: course._id,
            title: `${path} - ${level}`,
            description: course.description,
            roadmapImage: course.roadmapImage,
            resources: course.resources,
            prerequisites: course.prerequisites,
            msg: "Course created successfully"
        })
        }
    catch(err){
        console.error('Error details:', err);
        return res.status(403).json({
            msg: "Unuthorised",
            error: err.message
        })
    }
})
courseRouter.put("/update/path", async (req, res) => {
    try {
        const { path, level } = req.body;
        const userPath = await learningPathModel.findOneAndUpdate(
            { userId: req.userId },
            {
                path: path,
                level: level
            }
        );

        if (!userPath) {
            return res.status(404).json({
                msg: "Learning path not found"
            });
        }
        const course = await courseModel.findOneAndUpdate(
            {pathId: userPath._id},
        {
            title: `${path} - ${level}`,
            description: courseConfigs[path][level].description,
            roadmapImage: courseConfigs[path][level].roadmapImage,
            resources: courseConfigs[path][level].resources,
            prerequisites: courseConfigs[path][level].prerequisites
        },
        { new: true })
        return res.json({
            msg: "Learning path updated successfully",
            updatedCourse: course
        });
    } catch (err) {
        return res.status(500).json({
            msg: "Error updating learning path",
            error: err.message
        });
    }
});

courseRouter.put("/update/level", async (req, res) => {
    try {
        const { level } = req.body;
        const userPath = await learningPathModel.findOneAndUpdate(
            { userId: req.userId },
            { level: level });

        if (!userPath) {
            return res.status(404).json({
                msg: "Learning path not found"
            });
        } 
        const path = userPath.path;
        const course = await courseModel.findOneAndUpdate(
            { pathId: userPath._id }, 
            {
                title: `${path} - ${level}`,
                description: courseConfigs[path][level].description,
                roadmapImage: courseConfigs[path][level].roadmapImage,
                resources: courseConfigs[path][level].resources,
                prerequisites: courseConfigs[path][level].prerequisites
            },
            { new: true }
        );
        return res.json({
            msg: "Learning level updated successfully",
            updatedCourse: course
        });
    } catch (err) {
        return res.status(500).json({
            msg: "Error updating learning level",
            error: err.message
        });
    }
});

module.exports = {
    courseRouter: courseRouter
}