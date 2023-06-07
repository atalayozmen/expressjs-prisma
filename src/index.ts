import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get('/', async (req, res) => {
  const techRadarElements = await prisma.techRadarElement.findMany();
  res.json(techRadarElements);
});

app.post('/', async (req, res) => {
  const { label, quadrant, ring, active, moved } = req.body;
  const techRadarElement = await prisma.techRadarElement.create({
    data: {
      id: Date.now(),
      label,
      quadrant,
      ring,
      active,
      moved,
    },
  });
  res.json(techRadarElement);
});

app.post('/addmany', async (req, res) => {
  const techRadarElements= req.body;

  try {
  const createdTechRadarElements = await prisma.techRadarElement.createMany({
    data: techRadarElements,
    skipDuplicates: true,
  });

  res.json(createdTechRadarElements);
  } catch (e) {
    console.log("error: ", e)
  }
});


app.put('/saveEntries', async (req, res) => {

  const techRadarElements = req.body;
 
  try{
    console.log("testest")
    const deletedTechRadarElements = await prisma.techRadarElement.deleteMany({});
  }
  catch(e){
    console.log("saveentries error: Delete all failed: ")
  }

  try{
    console.log("test: ", techRadarElements)
    const createdTechRadarElements = await prisma.techRadarElement.createMany({
      data: techRadarElements,
      skipDuplicates: true,
    });

    res.json(createdTechRadarElements);
  
  } catch (e) {
    console.log("saveEntries error: ", e)
  }

});

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
