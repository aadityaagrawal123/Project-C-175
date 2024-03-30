AFRAME.registerComponent("models", {
  init: async function () {
    var modelsDetails = await this.getModels();

    var barcodes = Object.keys(modelsDetails);

    barcodes.map(barcode => {
      var model = modelsDetails[barcode];

      //Call the function
      this.createModels(model)
    });

  },

  getModels: function () {
    return fetch("js/modelsList.json")
      .then(res => res.json())
      .then(data => data);
  },
  
  createModels: async function (model) {
    //Scene
    var scene = document.querySelector("a-scene");

    //Model data
    var barcodeValue = model.barcode_value;
    var modelName = model.model_name;
    var modelPosition = model.position;
    var modelRotation = model.rotation;

    //Add marker entity for BARCODE marker
    var marker = document.createElement("a-marker");
    // Creating marker
    marker.setAttribute("id", `marker-${barcodeValue}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("model_name", modelName);
    marker.setAttribute("value", barcodeValue);
    // Adding Marker to Scene
    scene.appendChild(marker);

    // Creating Model
    var modelEntity = document.createElement("a-entity");
    modelEntity.setAttribute("id", `${modelName}`);
    modelEntity.setAttribute("position",modelPosition);
    modelEntity.setAttribute("rotation",modelRotation);

    if (barcodeValue === 0){
      var modelColor = model.color;
      var modelWidth = model.width;
      var modelHeight = model.height;

      modelEntity.setAttribute("material","color", modelColor);
      modelEntity.setAttribute("geometry", {
        primitive: "box",
        width: modelWidth,
        height: modelHeight
      });
    } 
    else {
      var modelScale = model.scale;
      var modelUrl = model.model_url;
      var modelPlacementPosition = model.placement_position;
      var modelPlacementRotation = model.placement_rotation;
      var modelPlacementScale = model.placement_scale;

      modelEntity.setAttribute("gltf-model",`url(${modelUrl})`);
      modelEntity.setAttribute("scale",modelScale);
    }

    marker.appendChild(modelEntity);

    },

});
