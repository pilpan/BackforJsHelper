/* eslint-disable consistent-return */
require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { User, Post, Question } = require('./db/models');

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
app.get('/reg', async (req, res) => {
  try {
    const finduser = await User.findAll({ where: [{ email: req.body.email },{ userName: req.body.userName }] });
    if (finduser[0]) {
      const hashPass = await bcrypt.hash(req.body.password, 10);
      await User.create({
        email: req.body.email,
        userName: req.body.userName,
        password: hashPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      req.session.UserSession = req.body;
       return res.json({ id: req.session.UserSession.id, email: req.session.UserSession.email});
    }
    return res.send(202);
  } catch (error) {
    res.json(error);
  }
});
// если приходит 202 то это значит что пользователь что-то не правильно ввел
app.get('/login', async (req, res) => {
  try {
    const logUser = await User.findAll({ Where: { email: req.body.email } });
    const result = await bcrypt.compare(req.body.password, logUser.password);
    if (result) {
      req.session.UserSession = req.body;
      return res.json({ id: req.session.UserSession.id, email: req.session.UserSession.email});
    }
    return res.sendStatus(202);
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
    const numofQuestion = await Question.findAll();
    res.json(numofQuestion);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
// возвращает вопрос опредленной категории
app.get('/question/:cat', async (req, res) => {
  try {
    let cat = 0;
    switch (req.params.cat) {
      case 'jun':
        cat = 1;
        break;
      case 'mid':
        cat = 2;
        break;
      case 'sen':
        cat = 3;
        break; 
      case 'rev':
        cat = 4;
        break; 
      default:
        break;
    }
    const numofQuestion = await Question.findAll({where: {cat_id: cat}});
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
    res.json(newpost);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}`);
});
