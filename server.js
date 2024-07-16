import express from 'express';
import puppeteer from 'puppeteer';


const app = express();
app.use(express.json());

app.all('/fillForm', async (req, res) => {
  const { mseg } = req.body;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--single-process",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote"
      ]
    });

    const variables = {
      "pp%": 'PhysicalPierce %',
"mp%": 'Magic Pierce %',
"acc": 'Accuracy',
"atk%": 'ATK%',
"matk%": 'MATK%',
"acc%": 'Accuracy %',
"dteli%": '% Stronger Against Light',
"dteea%": '% Stronger Against Earth',
"dtewa%": '% Stronger Against Water',
"dtefi%": '% Stronger Against Fire',
"dteda%": '% Stronger Against Dark',
"dtewi%": '% Stronger Against Wind',
"atk": 'ATK',
"matk": 'MATK',
"dodge": 'Dodge',
"hpreg": 'Natural HP regen',
"mpreg": 'Natural MP regen',
"agi": 'AGI',
"dex": 'DEX',
"int": 'INT',
"str": 'STR',
"vit": 'VIT',
"resli%": 'Light Resistance %',
"resea%": 'Earth Resistance %',
"reswa%": 'Water Resistance %',
"resfi%": 'Fire Resistance %',
"resda%": 'Dark Resistance %',
"reswi%": 'Wind Resistance %',
"maxhp%": 'MaxHP%',
"dodge%": 'Dodge %',
"stab%": 'Stability%',
"ail%": 'Ailment Resistance %',
"def%": 'DEF%',
"mdef%": 'MDEF%',
"pres%": 'PhysicalResistance %',
"mres%": 'Magic Resistance %',
"cd%": 'Critical Damage%',
"hpreg%": 'Natural HP regen%',
"mpreg%": 'Natural MP regen%',
"agi%": 'AGI%',
"dex%": 'DEX%',
"int%": 'INT%',
"str%": 'STR%',
"vit%": 'VIT%',
"eva%": 'Evasion Rate %',
"guard": 'Guard Power',
"guard%": 'Guard Rate %',
"maxmp": 'MaxMP',
"aggro%": 'Aggro %',
"hp": 'MaxHP',
"def": 'DEF',
"mdef": 'MDEF',
"cd": 'Critical Damage',
"aspd": 'ASPD',
"cspd": 'CSPD',
"aspd%": 'ASPD%',
"caspd%": 'CSPD%',
"cr": 'Critical Rate',
"cr%": 'Critical Rate%',
"foe%": '% Reduce Dmg (Foe Epicenter)',
"bow%": '% Reduce Dmg (Bowling)',
"bull%": '% Reduce Dmg (Bullet)',
"flo%": '% Reduce Dmg (Floor)',
"line": '% Reduce Dmg (Straight Line)',
"Charge%": '% Reduce Dmg (Charge)',
"epic%": '% Reduce Dmg (Player Epicenter)',
"mete%": '% Reduce Dmg (Meteor)',
"-pp%": 'PhysicalPierce %',
"-mp%": 'Magic Pierce %',
"-acc": 'Accuracy',
"-atk%": 'ATK%',
"-matk%": 'MATK%',
"-acc%": 'Accuracy %',
"-dteli%": '% Stronger Against Light',
"-dteea%": '% Stronger Against Earth',
"-dtewa%": '% Stronger Against Water',
"-dtefi%": '% Stronger Against Fire',
"-dteda%": '% Stronger Against Dark',
"-dtewi%": '% Stronger Against Wind',
"-atk": 'ATK',
"-matk": 'MATK',
"-dodge": 'Dodge',
"-hpreg": 'Natural HP regen',
"-mpreg": 'Natural MP regen',
"-agi": 'AGI',
"-dex": 'DEX',
"-int": 'INT',
"-str": 'STR',
"-vit": 'VIT',
"-resli%": 'Light Resistance %',
"-resea%": 'Earth Resistance %',
"-reswa%": 'Water Resistance %',
"-resfi%": 'Fire Resistance %',
"-resda%": 'Dark Resistance %',
"-reswi%": 'Wind Resistance %',
"-maxhp%": 'MaxHP%',
"-dodge%": 'Dodge %',
"-stab%": 'Stability%',
"-ail%": 'Ailment Resistance %',
"-def%": 'DEF%',
"-mdef%": 'MDEF%',
"-pres%": 'PhysicalResistance %',
"-mres%": 'Magic Resistance %',
"-cd%": 'Critical Damage%',
"-hpreg%": 'Natural HP regen%',
"-mpreg%": 'Natural MP regen%',
"-agi%": 'AGI%',
"-dex%": 'DEX%',
"-int%": 'INT%',
"-str%": 'STR%',
"-vit%": 'VIT%',
"-eva%": 'Evasion Rate %',
"-guard": 'Guard Power',
"-guard%": 'Guard Rate %',
"-maxmp": 'MaxMP',
"-aggro%": 'Aggro %',
"-hp": 'MaxHP',
"-def": 'DEF',
"-mdef": 'MDEF',
"-cd": 'Critical Damage',
"-aspd": 'ASPD',
"-cspd": 'CSPD',
"-aspd%": 'ASPD%',
"-caspd%": 'CSPD%',
"-cr": 'Critical Rate',
"-cr%": 'Critical Rate%',
"-foe%": '% Reduce Dmg (Foe Epicenter)',
"-bow%": '% Reduce Dmg (Bowling)',
"-bull%": '% Reduce Dmg (Bullet)',
"-flo%": '% Reduce Dmg (Floor)',
"-line5": '% Reduce Dmg (Straight Line)',
"-Charge%": '% Reduce Dmg (Charge)',
"-epic%": '% Reduce Dmg (Player Epicenter)',
"-mete%": '% Reduce Dmg (Meteor)',
"max": 'MAX',
    };

    const page = await browser.newPage();
    await page.goto('https://tanaka0.work/en/BouguProper');

    const inputText = mseg.body.trim();
    const parts = inputText.split(',');

    const shokiSenzaiValue = parts.shift().trim();

    const inputFromTerminal = parts;

    let minusIndex = 0;
    let plusIndex = 0;

    for (let i = 0; i < inputFromTerminal.length; i += 1) {
      const parts = inputFromTerminal[i].trim().split(' ');
      if (parts.length === 2) {
        const input = parts[0];
        const value = parts[1];

        if (input && value && variables[input]) {
          if (input.startsWith('-')) {
            if (value.toUpperCase() === 'MAX') {
              await page.evaluate((variable, index) => {
                document.querySelector(`#minus_name_${index}`).value = variable;
              }, variables[input], minusIndex);
            } else {
              await page.select(`#minus_name_${minusIndex}`, variables[input]);
              await page.select(`#minus_value_${minusIndex}`, value);
            }
            minusIndex++;
          } else {
            if (value.toUpperCase() === 'MAX') {
              await page.evaluate((variable, index) => {
                document.querySelector(`#plus_name_${index}`).value = variable;
              }, variables[input], plusIndex);
            } else {
              await page.select(`#plus_name_${plusIndex}`, variables[input]);
              await page.select(`#plus_value_${plusIndex}`, value);
            }
            plusIndex++;
          }
        } else {
          console.error(`Invalid input format or input not found: ${inputFromTerminal[i]}`);
        }
      } else {
        console.error(`Invalid input format: ${inputFromTerminal[i]}`);
      }
    }

    await page.select('#shokiSenzai', shokiSenzaiValue);
    await page.select('#jukurendo', '260');

    await Promise.all([
      page.waitForNavigation(),
      page.click('#sendData')
    ]);

    await page.waitForSelector('html');

    const result = await page.evaluate(() => {
      const htmlElement = document.querySelector('html');
      const textContent = htmlElement.innerText.trim();
      return textContent.split('\n').filter(line =>
        line.includes('Remaining Pot') ||
        line.includes('Highest mats per step') ||
        line.includes('Metal:') ||
        line.includes('Success Rate:') ||
        line.includes('Error Happened')
      ).join('\n');
    });

    res.send(result);

  } catch (error) {
    console.error('Error during script execution:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  res.end();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running`);
});
