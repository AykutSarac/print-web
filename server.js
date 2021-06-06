const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

app.post('/screenshot', async (req, res) => {
    // Set path & ID
    const ID = (new Date().getTime().toString(36));
    const loc = "./public/screenshots/" + ID + ".png";

    try {
        // Start browsers
        const browser = await puppeteer.launch({
            defaultViewport: {
                width: 1920,
                height: 1080
            },
            ignoreDefaultArgs: ['--disable-extensions']
        });

        // Open page
        const page = await browser.newPage();
        await page.goto(req.body.url);

        // Take a Screenshot
        await page.screenshot({ path: loc });

        await browser.close();

        res.json({
            success: true,
            ID
        });
    } catch (error) {
        res.status(500).send('500 Internal Server Error')
    }

});

app.listen(PORT, () => {
    console.log(`Listening app on port ${PORT} at http://localhost:${PORT}/`);
});