const canvas = document.getElementById('renderCanvas')
const engine = new BABYLON.Engine(canvas, true)

const createScene = function() {
  const scene = new BABYLON.Scene(engine)
  
  const camera = new BABYLON.ArcRotateCamera(
    'camera', 
    -Math.PI / 2, 
    Math.PI / 2.5, 15, 
    new BABYLON.Vector3(0, 0, 0)
  )
  camera.attachControl(canvas, true)
  
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 2, 0))
  
  const ground = buildGround()
  
  const detached_house = buildHouse(1)
  detached_house.rotation.y = -Math.PI / 16
  detached_house.position.x = -6.8
  detached_house.position.z = 2.5

  const semi_house = buildHouse(2)
  semi_house.rotation.y = -Math.PI / 16
  semi_house.position.x = -4.5
  semi_house.position.z = 3

  const places = [
    { houseType: 1, rotation: -Math.PI / 16, x:  -6.8, z: 2.5 },
    { houseType: 2, rotation: -Math.PI / 16, x: -4.5, z: 3 },
    { houseType: 2, rotation: -Math.PI / 16, x: -1.5, z: 4 },
    { houseType: 2, rotation: -Math.PI / 3, x: 1.5, z: 6 },
    { houseType: 2, rotation: 15 * Math.PI / 16, x: -6.4, z: -1.5 },
    { houseType: 1, rotation: 15 * Math.PI / 16, x: -4.1, z: -1 },
    { houseType: 2, rotation: 15 * Math.PI / 16, x: -2.1, z: -0.5 },
    { houseType: 1, rotation: 5 * Math.PI / 4, x: 0, z: -1 },
    { houseType: 1, rotation: Math.PI + Math.PI / 2.5, x: 0.5, z: -3 },
    { houseType: 2, rotation: Math.PI + Math.PI / 2.1, x: 0.75, z: -5 },
    { houseType: 1, rotation: Math.PI + Math.PI / 2.25, x: 0.75, z: -7 },
    { houseType: 2, rotation: Math.PI / 1.9, x: 4.75, z: -1 },
    { houseType: 1, rotation: Math.PI / 1.95, x: 4.5, z: -3 },
    { houseType: 2, rotation: Math.PI / 1.9, x: 4.75, z: -5 },
    { houseType: 1, rotation: Math.PI / 1.9,x:  4.75, z: -7 },
    { houseType: 2, rotation: -Math.PI / 3, x: 5.25, z: 2 },
    { houseType: 1, rotation: -Math.PI / 3, x: 6, z: 4 },
  ]

  const houses = places.map(({ houseType, rotation, x, z }, i) => {
    const id = `house${i}`
    const house = houseType === 1 
      ? detached_house.createInstance(id)
      : semi_house.createInstance(id)
    house.rotation.y = rotation
    house.position.x = x
    house.position.z = z
  })

  return scene
}

// Build functions
const buildHouse = width => {
  const roof = buildRoof(width)
  const box = buildBox(width)
  const house = BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true)
  return house
}

const buildBox = (width = 1) => {
  const faceUV = width === 2 ? [
    new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0), //rear face
    new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0), //front face
    new BABYLON.Vector4(0.4, 0, 0.6, 1.0), //right side
    new BABYLON.Vector4(0.4, 0, 0.6, 1.0) //left side
  ] : [
    new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0), //rear face
    new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0), //front face
    new BABYLON.Vector4(0.25, 0, 0.5, 1.0), //right side
    new BABYLON.Vector4(0.75, 0, 1.0, 1.0) //left side
  ]
  const box = BABYLON.MeshBuilder.CreateBox('box', { width,faceUV, wrap: true })
  box.position.y = 0.5
  const boxMat = new BABYLON.StandardMaterial('boxMat')
  boxMat.diffuseTexture = width === 2
    ? new BABYLON.Texture("/assets/semihouse.png")
    : new BABYLON.Texture("/assets/cubehouse.png")
  box.material = boxMat
  return box
}

const buildRoof = (width = 1) => {
  const roof = BABYLON.MeshBuilder.CreateCylinder('roof', {
    diameter: 1.3, 
    height: 1.2, 
    tessellation: 3,
  })
  roof.scaling.x = 0.75
  roof.scaling.y = width
  roof.rotation.z = Math.PI / 2
  roof.position.y = 1.22
  const roofMat = new BABYLON.StandardMaterial('roofMat')
  roofMat.diffuseTexture = new BABYLON.Texture("/assets/roof.jpg")
  roof.material = roofMat
  return roof
}

const buildGround = () => {
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 15, height: 16 })
  const groundMat = new BABYLON.StandardMaterial('groundMat')
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)
  ground.material = groundMat
  return ground
}

// Run the scene
const scene = createScene()

engine.runRenderLoop(function() {
  scene.render()
})

window.addEventListener('resize', function() {
  engine.resize()
})