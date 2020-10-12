const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

  const url = 'https://www.officedepot.co.cr/officedepotCR/en/Accesorios-para-C%C3%B3mputo/REPOSAPIES-STANDARD-FELLOWES/p/17844';


// Emailer


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'moonruledcr@gmail.com',
    pass: 'Otsugua00'
  }
});

var mailOptions = {
  from: 'moonruledcr@gmail.com',
  to: 'auguvalerio@gmail.com ',
  subject: 'officedepot Article Avaiable!',
  html: '<a href="'+url+'">Get it here!!!</p>'
};

const sendMail = () => {
  console.log('sending email');
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// url checker
    const checkWebsite = () => {
      axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const cartButton = $('#addToCartButton');

        console.log(cartButton.length);

        if(cartButton.length) {
          sendMail();
        }
      })
      .catch(console.error);
    }

    function callEveryHour() {
      checkWebsite()
      setInterval(checkWebsite, 1000 * 60 * 60);
    }

      var nextDate = new Date();
      if (nextDate.getMinutes() === 0) { // You can check for seconds here too
        callEveryHour()
      } else {
          nextDate.setHours(nextDate.getHours() + 1);
          nextDate.setMinutes(0);
          nextDate.setSeconds(0);// I wouldn't do milliseconds too ;)
      
          var difference = nextDate - new Date();
          setTimeout(callEveryHour, difference);
      }

