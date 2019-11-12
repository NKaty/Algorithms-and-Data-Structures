// Given a mapping between items, and items they depend on, a topological sort
// orders items so that no item precedes an item it depends upon.
// The compiling of a library in the VHDL language has the constraint that
// a library must be compiled after any library it depends on.
// Task: Write a function that will return a valid compile order of VHDL
// libraries from their dependencies. Assume library names are single words.
// Items mentioned as only dependents have no dependents of their own,
// but their order of compiling must be given. Any self dependencies should be ignored.
// Any un-orderable dependencies should be flagged.

function topologicalSort(libs) {
  const libsObject = libs.split('\n').reduce((acc, item) => {
    const libsArray = item.split(' ').filter(i => i !== '');
    acc[libsArray[0]] = libsArray.slice(1).filter(i => i !== libsArray[0]);
    return acc;
  }, {});

  const visited = {};
  const libsStack = {};
  const result = [];

  function traverse(lib) {
    if (visited[lib]) return;

    visited[lib] = true;

    if (typeof libsObject[lib] === 'undefined') return result.push(lib);

    libsStack[lib] = true;

    for (const item of libsObject[lib]) {
      if (libsStack[item]) console.log(`Un-orderable dependency: ${Object.keys(libsStack)}`);
      if (!visited[item]) traverse(item);
    }

    delete libsStack[lib];
    result.push(lib);
  }

  for (const lib of Object.keys(libsObject)) {
    traverse(lib);
  }

  return result;
}

const libs1 =
  `des_system_lib   std synopsys std_cell_lib des_system_lib dw02 dw01 ramlib ieee
  dw01             ieee dw01 dware gtech
  dw02             ieee dw02 dware
  dw03             std synopsys dware dw03 dw02 dw01 ieee gtech
  dw04             dw04 ieee dw01 dware gtech
  dw05             dw05 ieee dware
  dw06             dw06 ieee dware
  dw07             ieee dware
  dware            ieee dware
  gtech            ieee gtech
  ramlib           std ieee
  std_cell_lib     ieee std_cell_lib
  synopsys`;

console.log(topologicalSort(libs1));
// [ 'std',
//   'synopsys',
//   'ieee',
//   'std_cell_lib',
//   'dware',
//   'dw02',
//   'gtech',
//   'dw01',
//   'ramlib',
//   'des_system_lib',
//   'dw03',
//   'dw04',
//   'dw05',
//   'dw06',
//   'dw07' ]

const libs2 =
  `des_system_lib   std synopsys std_cell_lib des_system_lib dw02 dw01 ramlib ieee
  dw01             ieee dw01 dware gtech
  dw02             ieee dw02
  dw03             std synopsys dware dw03 dw02 dw01 ieee gtech
  dw04             dw04 ieee dw01 dware gtech
  dw05             dw05 ieee dware
  dw06             dw06 ieee dware
  dw07             ieee dware
  dware            ieee dware des_system_lib
  gtech            ieee gtech
  ramlib           std ieee
  std_cell_lib     ieee std_cell_lib
  synopsys`;

console.log(topologicalSort(libs2));

// Un-orderable dependency: des_system_lib,dw01,dware
// [ 'std',
//   'synopsys',
//   'ieee',
//   'std_cell_lib',
//   'dw02',
//   'dware',
//   'gtech',
//   'dw01',
//   'ramlib',
//   'des_system_lib',
//   'dw03',
//   'dw04',
//   'dw05',
//   'dw06',
//   'dw07' ]
