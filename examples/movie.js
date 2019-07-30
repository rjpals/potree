console.log("HELLO WORLD!")

const tickDisplayedPointCloud = (i, pcs) => {
    pcs[i].visible = false
    pcs[(i+1) % pcs.length].visible = true
    setTimeout( () => tickDisplayedPointCloud((i + 1) % pcs.length, pcs), 250)
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
        //go()
        tickDisplayedPointCloud(0, window.viewer.scene.pointclouds)
    })
}


const go = () => {
    const pcs = window.viewer.scene.pointclouds
    console.log("Testing testing 123")
    console.log(pcs[0])
    //function to hide #i pointcloud and show #i+1 pointcloud
    tickDisplayedPointCloud(0, pcs)
}
