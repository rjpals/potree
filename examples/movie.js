console.log("HELLO WORLD!")

const tickDisplayedPointCloud = (i, pcs) => {
    pcs[i].visible = false
    pcs[(i+1) % pcs.length].visible = true
    setTimeout( () => tickDisplayedPointCloud((i + 1) % pcs.length, pcs), 250)
}

const go = () => {
    const pcs = window.viewer.scene.pointclouds
    console.log("Testing testing 123")
    console.log(pcs[0])
    //function to hide #i pointcloud and show #i+1 pointcloud
    tickDisplayedPointCloud(0, pcs)
}

setTimeout(go, 5000)
