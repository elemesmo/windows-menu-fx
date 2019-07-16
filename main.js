// - Fake data
let menus = [
  { title: "Menu 1", icon: "fas fa-cat" },
  { title: "Menu 2", icon: "fas fa-rocket" },
  { title: "Menu 3", icon: "fas fa-camera" },
  { title: "Menu 4", icon: "fas fa-flask" },
  { title: "Menu 5", icon: "fas fa-address-book" }
];

const makeSvgGridItem = function(config, index) {
  let position = `y="${(config.itemSize + config.gridGap) * index}"`;
  let size = `width="${config.itemSize}" height="${config.itemSize}"`;
  return `<rect class="base-square" ${position} ${size} />`;
};

const makeNavGridItem = function(menu, config, index) {
  let menuTitle = !config.showText ? `title="${menu.title}"` : ``;
  let margin = `margin-bottom: ${config.gridGap}px;`;
  let size = `width: ${config.itemSize}px; height: ${config.itemSize}px;`;
  let textTop = `top: ${config.itemSize / 2 - config.fontSize / 2}px;`;
  let textFontSize = `font-size: ${config.fontSize}px;`;
  let menuText = config.showText
    ? `
        <span class="menu-title" style="${textTop} ${textFontSize}">
          ${menu.title}
        </span>`
    : ``;
  return `
      <div class="base-nav" ${menuTitle} style="${size} ${margin}">
        <span class="svg-icon">
          <i class="${menu.icon} ${config.iconSize}" style="color: #ffffff"></i>
        </span>
        ${menuText}
      </div>`;
};

$(document).ready(function() {
  // - Init
  let svgStage = $("#stage");
  let navMenu = $("#menu");
  let config = { itemSize: 45, iconSize: "fa-xs", fontSize: 12, gridGap: 0, showText: true };

  // - init mask
  let maskSize = config.itemSize;
  document.getElementById("mouse-mask").setAttribute("r", maskSize);

  // - Make grid - feed nav menu
  let navGridMarkup = "";
  let svgGridMarkup = "";
  menus.forEach(function(menu, index) {
    navGridMarkup += makeNavGridItem(menu, config, index);
    svgGridMarkup += makeSvgGridItem(config, index);
  });

  // - feed
  svgStage.html(svgStage.html() + svgGridMarkup);
  navMenu.html(navMenu.html() + navGridMarkup);

  // - stick mask to mousemove
  $(document).mousemove(function(e) {
    let mouseMask = document.getElementById("mouse-mask");
    mouseMask.setAttribute("cx", e.clientX);
    mouseMask.setAttribute("cy", e.clientY);
  });
});
