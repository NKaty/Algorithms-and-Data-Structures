// Find the top N ranked data in each group, where N is provided as a
// parameter. Name of the rank and the group are also provided as parameter.

function topRankPerGroup(n, data, groupName, rankName) {
  if (n < 0) return;

  data.sort((a, b) => {
    if (a[groupName] > b[groupName]) return 1;
    if (a[groupName] === b[groupName]) return b[rankName] - a[rankName];
    return -1;
  }
  );

  const groupedData = [];

  for (let i = 1, j = 0; i < data.length; i++) {
    if (data[i][groupName] !== data[j][groupName]) {
      groupedData.push(data.slice(j, i));
      j = i;
    }

    if (i === data.length - 1) groupedData.push(data.slice(j, i + 1));
  }

  return groupedData.reduce((acc, item) => {
    acc.push(item.slice(0, n));
    return acc;
  }, []);
}

const data = [
  { name: 'Tyler Bennett', id: 'E10297', salary: 32000, dept: 'D101' },
  { name: 'John Rappl', id: 'E21437', salary: 47000, dept: 'D050' },
  { name: 'George Woltman', id: 'E00127', salary: 53500, dept: 'D101' },
  { name: 'Adam Smith', id: 'E63535', salary: 18000, dept: 'D202' },
  { name: 'Claire Buckman', id: 'E39876', salary: 27800, dept: 'D202' },
  { name: 'David McClellan', id: 'E04242', salary: 41500, dept: 'D101' },
  { name: 'Rich Holcomb', id: 'E01234', salary: 49500, dept: 'D202' },
  { name: 'Nathan Adams', id: 'E41298', salary: 21900, dept: 'D050' },
  { name: 'Richard Potter', id: 'E43128', salary: 15900, dept: 'D101' },
  { name: 'David Motsinger', id: 'E27002', salary: 19250, dept: 'D202' },
  { name: 'Tim Sampair', id: 'E03033', salary: 27000, dept: 'D101' },
  { name: 'Kim Arlich', id: 'E10001', salary: 57000, dept: 'D190' },
  { name: 'Timothy Grove', id: 'E16398', salary: 29900, dept: 'D190' }
];
console.log(topRankPerGroup(2, data, 'dept', 'salary'));
// [ [ { name: 'John Rappl', id: 'E21437', salary: 47000, dept: 'D050' },
// { name: 'Nathan Adams', id: 'E41298', salary: 21900, dept: 'D050' } ],
// [ { name: 'George Woltman', id: 'E00127', salary: 53500, dept: 'D101' },
// { name: 'David McClellan', id: 'E04242', salary: 41500, dept: 'D101' } ],
// [ { name: 'Kim Arlich', id: 'E10001', salary: 57000, dept: 'D190' },
// { name: 'Timothy Grove', id: 'E16398', salary: 29900, dept: 'D190' } ],
// [ { name: 'Rich Holcomb', id: 'E01234', salary: 49500, dept: 'D202' },
// { name: 'Claire Buckman',id: 'E39876',salary: 27800,dept: 'D202' } ] ]
