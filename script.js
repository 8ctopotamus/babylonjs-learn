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
  
  const roof = BABYLON.MeshBuilder.CreateCylinder('roof', {
    diameter: 1.3, 
    height: 1.2, 
    tessellation: 3,
  })
  roof.scaling.x = 0.75
  roof.rotation.z = Math.PI / 2
  roof.position.y = 1.22
  const roofMat = new BABYLON.StandardMaterial('roofMat')
  roofMat.diffuseTexture = new BABYLON.Texture("/mats/roof.jpg", scene)
  roof.material = roofMat

  const box = BABYLON.MeshBuilder.CreateBox('box', {})
  box.position.y = 0.5
  const boxMat = new BABYLON.StandardMaterial('boxMat')
  boxMat.diffuseTexture = new BABYLON.Texture("/mats/floor.png", scene)
  box.material = boxMat

  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 })
  const groundMat = new BABYLON.StandardMaterial('groundMat')
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)
  ground.material = groundMat

  return scene
}

const scene = createScene()

engine.runRenderLoop(function() {
  scene.render()
})

window.addEventListener('resize', function() {
  engine.resize()
})