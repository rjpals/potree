const tickDisplayedPointCloud = (i, ms, step) => {
    const pcs = window.viewer.scene.pointclouds
    const iNext = (i + step) % pcs.length
    if(pcs.length > 0) {
        pcs[iNext].visible = true
        pcs[i].visible = false
    }
    setTimeout( () =>
        tickDisplayedPointCloud(window.movieIsPaused ? i : iNext, ms, step),
    ms)
}

window.movieIsPaused = true

const startMovie = () => {
    window.movieIsPaused = false
    tickDisplayedPointCloud(0, 1500, 1)
}


// takes an array of objects {name: "lion", path: "./lion/ept.json"} 
const loadPointcloudsInOrder = async (resources) => {
    const pcPromises = resources.map( ({ name, path }) => {
        return new Promise(
            (resolve) => Potree.loadPointCloud(path, name, resolve)
        ) 
    })

    const events = await Promise.all(pcPromises)
    const pointclouds = events.map( (e) => e.pointcloud)
    pointclouds.forEach( (pc) => window.viewer.scene.addPointCloud(pc))

    return pointclouds
}


const glacierInit = async () => {
    const pointclouds = await loadPointcloudsInOrder(window.movieResources)
    for(const pointcloud of pointclouds) {
        pointcloud.visible = false

        const material = pointcloud.material;
        material.size = 3;
        material.pointSizeType = Potree.PointSizeType.FIXED;
        material.pointColorType = Potree.PointColorType.ELEVATION
        material.elevationRange = [0, 180]
    }

    const scene = window.viewer.scene
    scene.view.position.set(-4234485.586, 9990252.213, 36176.402)
    scene.view.lookAt(new THREE.Vector3(-4246615.561, 9974709.709, 60.068));
    startMovie()
}

