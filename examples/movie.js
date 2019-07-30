const tickDisplayedPointCloud = (i, ms, step, repititions) => {
    if(repititions < 1) return
    const pcs = window.viewer.scene.pointclouds
    console.log(pcs.length)
    if(pcs.length > 0) {
        pcs[(i+step) % pcs.length].visible = true
        pcs[i].visible = false
    }
    setTimeout( () => tickDisplayedPointCloud((i + step) % pcs.length, ms, step, repititions - 1), ms)
}

const startMovie = () => tickDisplayedPointCloud(0, 1500, 1, Infinity)

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
            material.size = 3;
            material.pointSizeType = Potree.PointSizeType.FIXED;

            window.viewer.scene.addPointCloud(pointcloud)

            //viewer.fitToScreen(0.5);
        }
        viewer.scene.view.position.set(-4234485.586, 9990252.213, 36176.402)
        viewer.scene.view.lookAt(new THREE.Vector3(-4246615.561, 9974709.709, 60.068));
        viewer.scene.pointclouds.forEach(pc => pc.material.pointColorType = Potree.PointColorType.ELEVATION)
        viewer.scene.pointclouds.forEach(pc => pc.material.elevationRange = [8, 188])
    })
}

