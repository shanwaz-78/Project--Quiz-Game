function render_app() {
  const spans = document.querySelectorAll("span");
  for (let i = 0; i < spans.length; i++) {
    remove_element(spans[i], get_random_number(500, 3000));
  }

  const circle_count = get_random_number(5, 100);

  const fragment = document.createDocumentFragment();

  for (let i = 0; i <= circle_count; i++) {
    const circle = get_circle();
    fragment.appendChild(circle);
  }

  document.body.appendChild(fragment);
}

function remove_element(el, speed) {
  var seconds = speed / 1000;
  el.style.transition = "opacity " + seconds + "s ease";

  el.style.opacity = 0;
  setTimeout(function () {
    el.remove();
  }, speed);
}

function get_random_number(min, max) {
  return Math.random() * (max - min) + min;
}

function get_random_color() {
  const hue = Math.floor(Math.random() * 361);
  const saturation = 100;
  const lightness = 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function get_random_position() {
  const x = window.innerWidth;
  const y = window.innerHeight;

  const random_x = Math.floor(Math.random() * x);
  const random_y = Math.floor(Math.random() * y);

  return [random_x + "px", random_y + "px"];
}

function get_circle() {
  const span = document.createElement("span");
  span.classList.add("circle");
  const size = get_random_number(10, 80) + "px";
  const color = get_random_color();
  const [x, y] = get_random_position();

  span.style.width = size;
  span.style.height = size;
  span.style.backgroundColor = color;
  span.style.top = y;
  span.style.left = x;

  setTimeout(function () {
    let vx = get_random_number(-5, 5);
    let vy = get_random_number(-5, 5);
    // Ensure a minimum velocity to prevent circles from getting stuck
    if (Math.abs(vx) < 0.5) vx += 0.5 * Math.sign(vx);
    if (Math.abs(vy) < 0.5) vy += 0.5 * Math.sign(vy);

    function moveCircle() {
      let left = span.offsetLeft;
      let top = span.offsetTop;
      left += vx;
      top += vy;

      // Add the size of circle to boundary check
      if (left <= 0 || left + parseInt(size) >= window.innerWidth) {
        vx = -vx;
        left += vx;
      }
      if (top <= 0 || top + parseInt(size) >= window.innerHeight) {
        vy = -vy;
        top += vy;
      }

      span.style.left = left + "px";
      span.style.top = top + "px";
      requestAnimationFrame(moveCircle);
    }

    requestAnimationFrame(moveCircle);
  }, get_random_number(1000, 5000));

  return span;
}

render_app();
document.querySelector("button").addEventListener("click", function () {
  render_app();
});

