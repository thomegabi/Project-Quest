@echo off

cd BackEnd
start npm start
start docker-compose up -d
start npx prisma studio

cd ..
cd FrontEnd
start npm run dev