const http = require('http');


let courses = [
    {
        courseId: 101,
        courseName: "Full Stack Development",
        courseCode: "FDS201",
        department: "CSE-DS"
    },

    {
        courseId: 102,
        courseName: "Object Oriented Programming Paradigm",
        courseCode: "DS202",
        department: "CSE-DS"
    },

    {
        courseId: 103,
        courseName: "Data visualization Using Python",
        courseCode: "DBMS203",
        department: "CSE-DS"
    }
];


const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    
    if (req.method === 'GET' && req.url === '/courses') {

        res.writeHead(200);
        res.end(JSON.stringify(courses, null, 4));
    }

    
    else if (req.method === 'POST' && req.url === '/courses') {

        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            const newCourse = JSON.parse(body);

            courses.push(newCourse);

            res.writeHead(201);
            res.end(JSON.stringify({
                message: "Course added successfully",
                course: newCourse
            }, null, 4));
        });
    }

    
    else if (req.method === 'GET' && req.url.startsWith('/courses/')) {

        const id = Number(req.url.split('/')[2]);

        const course = courses.find(c => c.courseId === id);

        if (course) {
            res.writeHead(200);
            res.end(JSON.stringify(course, null, 4));
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify({
                message: "Course not found"
            }));
        }
    }

    
    else if (req.method === 'PUT' && req.url.startsWith('/courses/')) {

        const id = Number(req.url.split('/')[2]);

        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            const updatedCourse = JSON.parse(body);

            const index = courses.findIndex(c => c.courseId === id);

            if (index !== -1) {

                courses[index] = {
                    courseId: id,
                    courseName: updatedCourse.courseName,
                    courseCode: updatedCourse.courseCode,
                    department: updatedCourse.department
                };

                res.writeHead(200);
                res.end(JSON.stringify({
                    message: "Course updated successfully",
                    course: courses[index]
                }, null, 4));
            }
            else {
                res.writeHead(404);
                res.end(JSON.stringify({
                    message: "Course not found"
                }));
            }
        });
    }

    
    else if (req.method === 'DELETE' && req.url.startsWith('/courses/')) {

        const id = Number(req.url.split('/')[2]);

        const index = courses.findIndex(c => c.courseId === id);

        if (index !== -1) {

            courses.splice(index, 1);

            res.writeHead(200);
            res.end(JSON.stringify({
                message: "Course deleted successfully"
            }));
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify({
                message: "Course not found"
            }));
        }
    }


    else {

        res.writeHead(404);
        res.end(JSON.stringify({
            message: "Invalid Route"
        }));
    }

});


server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});