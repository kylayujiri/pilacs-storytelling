document.addEventListener('DOMContentLoaded', main);

const make_btn_yellow = true;

const purple = '#5d5b79'
const yellow = '#EEC684'

function main() {
  load_nodes();
  load_teachers();
  add_connectors();

  // if the window resizes, call add_connectors again
  window.addEventListener('resize', (evt) => {
    add_connectors();
  });
}

function load_nodes() {
  const nodes = document.querySelectorAll('.node');

  nodes.forEach(function(node) {
    const btn = node.querySelector('button');
    btn.onclick = function() {

      const modal = document.querySelector('.modal[data-index="' + node.dataset.index + '"]');
      modal.style.display = "block";

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }

  });
}

function add_connectors() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  connect(get_node(0), get_node(2), 'b', 't');
  connect(get_node(1), get_node(3), 'b', 't');
  connect(get_node(3), get_node(5), 'b', 't');
  connect(get_node(2), get_node(6), 'b', 't');
  connect(get_node(4), get_node(3), 'b', 't');
  connect(get_node(3), get_node(7), 'b', 't');
}

function get_node(node_id) {
  return document.querySelector('.node[data-index="' + node_id + '"]');
}

function connect(item1, item2, start, end) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  rect1 = item1.getBoundingClientRect();
  rect2 = item2.getBoundingClientRect();

  let startX, startY, endX, endY = 0.0;

  switch (start) {
    case 't':
      startX = rect1.width * 0.5 + rect1.left;
      startY = rect1.top;
      break;
    case 'r':
      startX = rect1.width + rect1.left;
      startY = rect1.height * 0.5 + rect1.top;
      break;
    case 'b':
      startX = rect1.width * 0.5 + rect1.left;
      startY = rect1.height + rect1.top;
      break;
    case 'l':
      startX = rect1.left;
      startY = rect1.width * 0.5 + rect1.top;
      break;
    default:
      console.log('Problem with connector start position');
  }

  switch (end) {
    case 't':
      endX = rect2.width * 0.5 + rect2.left;
      endY = rect2.top;
      break;
    case 'r':
      endX = rect2.width + rect2.left;
      endY = rect2.height * 0.5 + rect2.top;
      break;
    case 'b':
      endX = rect2.width * 0.5 + rect2.left;
      endY = rect2.height + rect2.top;
      break;
    case 'l':
      endX = rect2.left;
      endY = rect2.height * 0.5 + rect2.top;
      break;
    default:
      console.log('Problem with connector end position');
  }


  // stroke style
  ctx.lineWidth = 5;

  // replace hard coding of rgb form of yellow later
  if (item1.style.borderColor == 'rgb(238, 198, 132)' && item2.style.borderColor == 'rgb(238, 198, 132)') {
    ctx.strokeStyle = yellow;
  } else {
    ctx.strokeStyle = purple;
  }

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function reset_node_color() {
  const nodes = document.querySelectorAll('.node');

  nodes.forEach(function(node) {
    node.style.borderColor = purple;

    if (make_btn_yellow) {
        node.querySelector('button').style.backgroundColor = purple;
    }
  });
}

function reset_modal_color() {
  const modals = document.querySelectorAll('.modal');

  modals.forEach(function(modal) {
    modal.querySelector('.modal-content').style.borderColor = purple;
  });
}

function load_teachers() {

  const teachers = document.querySelectorAll('.teacher');

  teachers.forEach(function(teacher) {
    teacher.onclick = function() {
      reset_node_color();
      reset_modal_color();
      switch (teacher.dataset.teacherId) {
        case '-1':
          reset_node_color();
          reset_modal_color();
          add_connectors();
          break;
        case '0':
          load_teacher(0, 2, 6);
          break;
        case '1':
          load_teacher(1, 3, 5);
          break;
        case '2':
          load_teacher(3, 4, 7);
          break;
        default:
          console.log("Teacher not found.")
      }
    }
  });

}

function load_teacher(...ids) {
  ids.forEach((id, i) => {
    const node = document.querySelector('.node[data-index="' + id + '"]');
    node.style.borderColor = yellow;

    if (make_btn_yellow) {
        node.querySelector('button').style.backgroundColor = yellow;
    }

    const modal = document.querySelector('.modal[data-index="' + id + '"]');
    modal.querySelector('.modal-content').style.borderColor = yellow;
  });
  add_connectors();
}
