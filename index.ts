import * as puppeteer from 'puppeteer';
// await page.screenshot({path: 'exemplo1.png'});
//* Site do MTE http://www3.mte.gov.br/sistemas/mediador/ConsultarInstColetivo //
// https://medium.com/@fabiojanio/node-js-web-scraping-com-puppeteer-29dd974eb042 //
const cnpj:string = "58200916000175"; // SEM PONTOS, TRAÇOS E BARRAS!

// quant: quantidade de instrumentos coletivos: #divFiltro > div > form > h2 | <- regex para capturar -> \d(\d{1,})?\1
//


if(cnpj.length !== 14) {
    console.error('O campo CNPJ deve possuir somente 14 caracteres.')
}

(
    async () => {

        const day = new Date();

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://www3.mte.gov.br/sistemas/mediador/ConsultarInstColetivo');
        await page.click('[id=chkNRCNPJ]');
        await page.type('input[id=txtNRCNPJ]', cnpj);
        await page.select('[id=cboSTVigencia]', '2');
        await page.click('[id=btnPesquisar]');
        await page.waitFor(9000);
        //await page.screenshot({path: 'pesquisou.png'});
        
        const quant:any = await page.evaluate(() =>{
            // Retorna a quantidade de convenções coletivas encontradas.

            const res = [];
            document.querySelectorAll('#divFiltro > div > form > h2').forEach(resul => res.push(resul.textContent));

            
            return /\d(\d{0,4})?/.exec(res[0]); // Retorna o primeiro resultado tratado por expressão regular.
        });



        await browser.close();
        const ret = {day, quant};
        console.log(ret);
    })();
