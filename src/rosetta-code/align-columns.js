// Given a text file of many lines, where fields within a line are delineated
// by a single 'dollar' character, write a program that aligns each column of
// fields by ensuring that words in each column are separated by at least one
// space. Further, allow for each word in a column to be either left justified,
// right justified, or center justified within its column.
// Note that:
// The example input texts lines may, or may not, have trailing dollar characters.
// All columns should share the same alignment.
// Consecutive space characters produced adjacent to the end of lines are
// insignificant for the purposes of the task.
// Output text will be viewed in a mono-spaced font on a plain text editor or basic terminal.
// The minimum space between columns should be computed from the text and not hard-coded.
// It is not a requirement to add separating characters between or around columns.

function formatText (input, justification = 'center') {
  let data;

  if (typeof input === 'string') data = input.split('\n');
  else if (input instanceof Array) data = [...input];
  else throw Error('Input must be an array or string');

  data = data.map(item => item.split('$').filter(item => item.length !== 0));

  const maxLengths = data
    .reduce((acc, item) => {
      item.forEach((word, index) => {
        acc[index] = acc[index] || [];
        acc[index].push(word);
      });
      return acc;
    }, [])
    .reduce((acc, item) => {
      acc.push(item.reduce((maxLen, word) => Math.max(maxLen, word.length), 0));
      return acc;
    }, []);

  const result = data.map(item => item.map((word, index) => {
    const diff = maxLengths[index] - word.length;
    let str;

    if (justification === 'left') str = `${word}${' '.repeat(diff)}`;
    if (justification === 'right') str = `${' '.repeat(diff)}${word}`;
    if (justification === 'center') {
      str = `${' '.repeat(Math.floor(diff / 2))}${word}${' '.repeat(Math.ceil(diff / 2))}`;
    }

    return str;
  }));

  return result.map(item => item.join(' ')).join('\n');
}

const testArr = [
  'Given$a$text$file$of$many$lines,$where$fields$within$a$line$',
  "are$delineated$by$a$single$'dollar'$character,$write$a$program",
  'that$aligns$each$column$of$fields$by$ensuring$that$words$in$each$',
  'column$are$separated$by$at$least$one$space.',
  'Further,$allow$for$each$word$in$a$column$to$be$either$left$',
  'justified,$right$justified,$or$center$justified$within$its$column.'
];

const testStr = `Given$a$text$file$of$many$lines,$where$fields$within$a$line$
are$delineated$by$a$single$'dollar'$character,$write$a$program
that$aligns$each$column$of$fields$by$ensuring$that$words$in$each$
column$are$separated$by$at$least$one$space.
Further,$allow$for$each$word$in$a$column$to$be$either$left$
justified,$right$justified,$or$center$justified$within$its$column.`;

console.log(formatText(testArr));
//   Given        a         text     file    of     many      lines,    where   fields  within    a    line
//    are     delineated     by       a    single 'dollar'  character,  write      a    program
//    that      aligns      each    column   of    fields       by     ensuring  that    words    in   each
//   column      are     separated    by     at     least      one      space.
//  Further,    allow       for      each   word     in         a       column    to      be    either left
// justified,   right    justified,   or   center justified   within     its    column.

console.log(formatText(testStr, 'left'));
// Given      a          text       file   of     many      lines,     where    fields  within  a      line
// are        delineated by         a      single 'dollar'  character, write    a       program
// that       aligns     each       column of     fields    by         ensuring that    words   in     each
// column     are        separated  by     at     least     one        space.
// Further,   allow      for        each   word   in        a          column   to      be      either left
// justified, right      justified, or     center justified within     its      column.

console.log(formatText(testArr, 'right'));
//      Given          a       text   file     of      many     lines,    where  fields  within      a line
//        are delineated         by      a single  'dollar' character,    write       a program
//       that     aligns       each column     of    fields         by ensuring    that   words     in each
//     column        are  separated     by     at     least        one   space.
//   Further,      allow        for   each   word        in          a   column      to      be either left
// justified,      right justified,     or center justified     within      its column.
