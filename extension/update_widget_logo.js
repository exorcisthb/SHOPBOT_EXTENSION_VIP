
const fs = require('fs');
const path = require('path');

const widgetPath = 'e:/ShopBot_Extension bản VIP/ShopBot_Extension/extension/widget.js';
const iconPath = path.join(__dirname, 'icons', 'sb_v4_128.png');

try {
    const iconData = fs.readFileSync(iconPath);
    const base64 = iconData.toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;

    let content = fs.readFileSync(widgetPath, 'utf8');

    // Replace the two instances of old base64
    const regex = /src="data:image\/jpeg;base64,[^"]+"/g;
    content = content.replace(regex, `src="${dataUrl}"`);

    fs.writeFileSync(widgetPath, content);
    console.log('Successfully updated widget.js with new logo');
} catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
}
