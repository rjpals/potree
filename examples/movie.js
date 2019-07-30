const tickDisplayedPointCloud = (i) => {
    const pcs = window.viewer.scene.pointclouds
    pcs[i].visible = false
    pcs[(i+1) % pcs.length].visible = true
    setTimeout( () => tickDisplayedPointCloud((i + 1) % pcs.length), 250)
}

// takes an array of objects {name: "lion", path: "./lion/ept.json"} 
const loadPointcloudsInOrder = (resources) => {
    console.log('entry')
    const pcPromises = resources.map( ({ name, path }) => {
        return new Promise(
            (resolve) => Potree.loadPointCloud(path, name, resolve)
        ) 
    })

    Promise.all(pcPromises).then( (events) => {
        const pointclouds = events.map( (e) => e.pointcloud)
        for(let pointcloud of pointclouds) {
            pointcloud.visible = false
            let material = pointcloud.material;
            material.size = 1;
            material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

            window.viewer.scene.addPointCloud(pointcloud)

            viewer.fitToScreen(0.5);
        }
        tickDisplayedPointCloud(0)
    })
}

