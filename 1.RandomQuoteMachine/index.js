const colors = [
  '#FF024A',
  '#FF7F09',
  '#27AE60',
  '#FF999F',
  '#8E077E',
  '#C0C8DC',
  '#001F3C',
  '#007AFF',
  '#D7BE69',
  '#282828',
];

let allQuotes;

const getQuotes = () => {
  return $.getJSON(
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    data => {
      allQuotes = data;
    }
  );
};

const getRandomQuote = () =>
  allQuotes.quotes[Math.floor(Math.random() * allQuotes.quotes.length)];

const getQuote = () => {
  const { quote, author } = getRandomQuote();

  $('#tweet-quote').attr(
    'href',
    `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
      `"${quote}"-${author}`
    )}`
  );

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').text(author);
  });

  const color = colors[Math.floor(Math.random() * colors.length)];

  $('body').animate(
    {
      backgroundColor: color,
      color: color,
    },
    1000
  );

  $('.button').animate({ backgroundColor: color }, 1000);
};

$(document).ready(() => {
  getQuotes().then(getQuote);

  $('#new-quote').on('click', getQuote);
});
