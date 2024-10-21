@echo off

cd BackEnd
start npm start
start docker-compose up -d
start npx prisma studio
