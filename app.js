/* eslint-disable consistent-return */
require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const axios = require('axios');
const cheerio = require('cheerio');
const { User, Post, Question, Category, Comment} = require('./db/models');
const { Op } = require('sequelize');

const PORT = process.env.PORT ?? 3002;
const app = express();
app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(morgan('dev'));

const sessionConfig = {
  name: 'mega-cookie',
  secret: process.env.SECRET || 'thisisnotsecure',
  store: new FileStore(),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: true,
  saveUninitialized: false,
};

app.use(session(sessionConfig));
// если приходит 202 то это значит что пользователь уже есть в бд
app.post('/reg', async (req, res) => {
  try {
    const finduser = await User.findAll({ where: {
      [Op.or]:
      [{ email: req.body.email },
      { userName: req.body.userName }] 
    }
    });
    console.log(finduser[0]);
    if (!finduser[0]) {
      const hashPass = await bcrypt.hash(req.body.password, 10);
      const temp = await User.create({
        email: req.body.email,
        userName: req.body.userName,
        password: hashPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      req.session.UserSession = req.body;
      console.log(temp.exp);
       return res.json({ id: temp.id, userName: req.session.UserSession.userName, exp: temp.exp});
    }
    return res.send(400);
  } catch (error) {
    res.json(error);
  }
});
// если приходит 202 то это значит что пользователь что-то не правильно ввел
app.post('/login', async (req, res) => {
  try {
    const logUser = await User.findAll({ where: { email: req.body.email } });
    if(!logUser[0]) {
      return res.sendStatus(400);
    }
    const result = await bcrypt.compare(req.body.password, logUser[0].password);
    if (result) {
      req.session.UserSession = req.body;
      console.log(logUser[0].id);
      return res.json({ id: logUser[0].id, userName: logUser[0].userName, exp: logUser[0].exp });
    }
    return res.sendStatus(400);
  } catch (error) {
    res.json(error);
  }
});
app.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('mega-cookie');
    res.sendStatus(200);
  } catch (error) {
    res.json(error);
  }
});
// возвращает случайный вопрос
app.get('/randomquestion', async (req, res) => {
  try {
    const numofQuestion = await Question.findAll();
    console.log('123');
    const r = Math.floor(Math.random() * numofQuestion.length + 1);
    const newQuestion = await Question.findAll({ where: { id: r } });
    res.json(newQuestion);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
// возвращает все вопросы из бд
app.get('/questions', async (req, res) => {
  try {
    const numofQuestion = await Question.findAll({include: {model: Category}});
    res.json(numofQuestion);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
// возвращает вопрос опредленной категории
app.get('/question/:cat', async (req, res) => {
  try {
    const numofQuestion = await Question.findAll({where: {cat_id: req.params.cat}, include: {model: Category}});
    res.json(numofQuestion);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
// меняет в бз колличество экспы
app.get('/stat/:num/:id', async (req, res) => {
  try {
    const userUpdate = await User.increment('exp',  {by: Number(req.params.num), where: {id: req.params.id }});
    res.json(200);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({include: { model: User}});
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
app.post('/posts/:id', async (req, res) => {
  try {
    const newpost = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.params.id,
      postState: false,
      createdAt: new Date(),
      updatedAt: new Date(),
     });
     const tempPost = await Post.findByPk(newpost.id,{include:{model: User}});
    res.json(tempPost);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.get('/catque', (req,res) => {
  const data = fs.readFileSync(`./public${req.body.path}`,'utf-8');
  res.json(data);
})
app.get('/com/:id', async (req,res) => {
  const postComm = await Comment.findAll({
    where: {post_id: req.params.id},
    include: { model:User },
  })
  console.log(postComm);
  res.json(postComm);
})
app.post('/com/:postId/:userId', async (req,res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      post_id: req.params.postId,
      user_id: req.params.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const tempComm = await Comment.findByPk(newComment.id,{include:{model:User}});
    res.json(tempComm);
  } catch (error) {
    res.json(error);
  }
})

const getHTML = async (url) => {
  const { data } = await axios.get(url);
  return cheerio.load(data);
};
app.get('/news', async (req,res) => {
  try {
    const href = await getHTML('https://habr.com/ru/flows/develop/news/');
    const pageNumber = href('a.tm-pagination__page').eq(-1).text();
    console.log(pageNumber);
    const arr = [];
    for (let i = 1; i <= 3; i++) {
      const selector = await getHTML(
        `https://habr.com/ru/flows/develop/news/page${i}/`,
      );
      selector('.tm-article-snippet').each((i, element) => {
        const link = `https://habr.com${selector(element).find('a.tm-article-snippet__title-link').attr('href')}`;
        const title = selector(element).find('a.tm-article-snippet__title-link').text();
        let images = selector(element).find('img.tm-article-snippet__lead-image').attr('src');
        if(!images) {
          images = 'https://upload.wikimedia.org/wikipedia/ru/a/ac/No_image_available.svg'
        }
        const subTitle = selector(element).find('div.article-formatted-body').find('p').text();
        arr.push({
          link, title, images, subTitle,
        });
      });
    }
    res.json(arr);
  } catch (error) {
    console.log('iui!', error);
  }
})

app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}`);
});
