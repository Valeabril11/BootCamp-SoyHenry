// const bodyParser = require("body-parser");
const express = require('express');
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1;
const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json()); // esto se encarga de ver que informacion le estoy pasando

// TODO: your code to handle requests

server.post('/posts', (req, res) => {
    const { author, title, contents, mas } = req.body;
    if (!author || !title || !contents) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
    const post = { author, title, contents, id: id++ };
    posts.push(post);
    res.status(200).json(post);
})

server.post('/posts/author/:author', (req, res) => {
    let { author } = req.params;
    let { title, contents } = req.body;
    if (!title || !contents) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
    const post = { author, title, contents, id: id++ };
    posts.push(post);
    res.status(200).json(post);
})
server.get('/posts', (req, res) => {
    let { term } = req.query;
    if (term) {
        const term_posts = posts.filter(
            (p) => p.title.includes(term) || p.contents.includes(term)
        );
        return res.json(term_posts)
    }
    res.json(posts)
})

server.get('/posts/:author', (req, res) => {
    let { author } = req.params;
    const author_posts = posts.filter((a) => a.author === author);
    if (author_posts.length > 0) {
        res.json(author_posts);
    } else {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No existe ningun post del autor indicado" })
    }
})

server.get('/posts/:author/:title', (req, res) => {
    let { author, title } = req.params;
    const ayt_posts = posts.filter((a) => a.author === author && a.title === title);
    if (ayt_posts.length > 0) {
        res.json(ayt_posts);
    } else {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No existe ningun post con dicho titulo y autor indicado" })
    }

})

server.put('/posts', (req, res) => {
    let { id, title, contents } = req.body;
    if (id && title && contents) {
        //el find -> devuelve el primer elemento que coincidacomo el id es unico, deberia encontrar un unico elemento con el id pasado por el body, por lo tanto -----> puedo usar find que me va a devolver lo que quiero
        let post = posts.find(p => p.id === parseInt(id));
        if (post) {
            post.title = title;
            post.contents = contents;
            res.json(post);
        } else {
            res
                .status(STATUS_USER_ERROR)
                .json({ error: 'No existe ningun post con el id indicado' })
        }
    } else {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No se recibieron los parámetros necesarios para modificar el Post" })
    }
})

server.delete('/posts', (req, res) => {
    let { id } = req.body;

    const post_delete = posts.find(p => p.id === parseInt(id));
    if (!id || !post_delete) {
        res
            .status(STATUS_USER_ERROR)
            .json({ error: "Mensaje de error" })
    } else {
        posts = posts.filter(p => p.id !== parseInt(id)) //aca me estoy quedando con todos los elementos que NO tienen el id pasado por body
        res.json({ success: true })
    }
});

server.delete('/author', (req, res) => {
    let { author } = req.body;
    const post_au = posts.find(p => p.author === author);
    if (!author || !post_au) {
        return res.status(STATUS_USER_ERROR).json({ error: "No existe el autor indicado" })
    }

    let delete_author = [];

    posts = posts.filter(p => {
        if (p.author !== author) {
            return true; // retornamos true porque queremos que se incluya dentro de posts
        } else {
            delete_author.push(p)
        }
    })

})

module.exports = { posts, server };
