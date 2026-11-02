const mapImages = document.querySelectorAll("img[usemap]");

mapImages.forEach((image) => {
  const mapName = image.useMap.slice(1);
  const imageMap = Array.from(document.getElementsByTagName("map")).find(
    (map) => map.name === mapName,
  );

  if (!imageMap) {
    return;
  }

  const areas = Array.from(imageMap.areas).map((area) => ({
    area,
    coordinates: area.coords.split(",").map(Number),
  }));

  const resizeAreas = () => {
    if (!image.naturalWidth || !image.clientWidth) {
      return;
    }

    const scaleX = image.clientWidth / image.naturalWidth;
    const scaleY = image.clientHeight / image.naturalHeight;

    areas.forEach(({ area, coordinates }) => {
      area.coords = coordinates
        .map((coordinate, index) =>
          Math.round(coordinate * (index % 2 === 0 ? scaleX : scaleY)),
        )
        .join(",");
    });
  };

  image.addEventListener("load", resizeAreas);

  if ("ResizeObserver" in window) {
    new ResizeObserver(resizeAreas).observe(image);
  } else {
    window.addEventListener("resize", resizeAreas);
  }

  resizeAreas();
});
