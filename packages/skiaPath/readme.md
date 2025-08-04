Extract the core code related to Path2D, PathStore, and isPointInPath from the Skia source code, and rewrite it in TypeScript.  

**PathBuilder**: This is the core class, ported from Skia's PathBuilder class. Some methods have been rewritten, redundant code has been removed, and the logic has been simplified.  

Additionally, a **Path2D** object is added to ensure compatibility with the browser's native Path2D API. The rendering behavior is tested to be consistent with the native Path2D, including support for parameters such as `startAngle`, `sweepAngle`, and `rotationAngle` in methods like `arcTo`, `arc`, and `ellipse`.  

**New methods added to Path2D**:  
- `ellipseArc`  
- `conicTo`  
- `contains` (for point-in-path detection)  

The implementation ensures that the behavior matches the native Path2D while extending functionality where needed.


## bounds
```typescript
    path.getBounds() // 包围盒包含曲线的控制点
    path.computeTightBounds()// 不包含曲线控制点
```
## hitTest
```typescript
    // 判断点是否在填充区域内
    path.contains(x,y,"evenodd" | "nonzero") 
    // 判断点是否在路径上
    let newPath=stroker.stroke(path,{
        strokeWidth:20,
        lineJoin:'round',// 'miter'|'round'|'bevel'
        lineCap:'butt',
        miterLimit:10

    })
    newPath.contains(x,y) 
```
## Use In Canvas
```typescript
    import {Path2D,PathStroker,PathBuilder} from 'skia-path2d'

    //
    let canvas=document.createElement('canvas')
    let ctx=canvas.getContext('2d')

    let path2d=new Path2D()
    let path2d=new Path2D('M100 100')
    path2d.ellipse(100,100,50,60,0,0,Math.PI*2,false)
    path2d.toCanvas(ctx)

```
## Use In Svg
```typescript
let svgCmd='M100 100A50 60 0 1 1 100 100 Z'
    let path=new Path2D(svgCmd)
    path.arc(100,100,100,0,Math.PI*2,false)
    //or
    path.ellipseArc(100,100,50,60,0,0,Math.PI*2,false)
    let svgCmd=path.toSvgPath() // 返回svg path
    // svg
    <path d=`${svgCmd}` />
```
## Use In WebGL
```typescript
    import {tesselate} form 'tess2'
    let path=new Path2D()
    path.arc(100,100,100,0,Math.PI*2,false)

    let stroker=new PathStroker()

    let path_builder=path.getPath()
    let newPathBuild=stroker.stroke(path_builder,{
        strokeWidth:20,
        lineJoin:'round',// 'miter'|'round'|'bevel'
        lineCap:'butt',
        miterLimit:10

    })
    // webgl
    let gl=canvas.getContext('webgl')
    const res = tesselate({
        windingRule: 1,
        contours: newPathBuild.toPolygons(),
        vertexSize: 2,
    })!
 
    // Use triangles
    let vertices=[]

    for (var i = 0; i < res.elements.length; i += 3) {
        var a = res.elements[i], b = res.elements[i + 1], c = res.elements[i + 2];
        vertices.push(res.vertices[a * 2], res.vertices[a * 2 + 1],)
        vertices.push(res.vertices[b * 2], res.vertices[b * 2 + 1])
        vertices.push(res.vertices[c * 2], res.vertices[c * 2 + 1])
    }
    let vertexBuffer=gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(push),gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0,2,this.gl.FLOAT,false,0,0)
    gl.drawArrays(gl.TRIANGLES,0,push.length/2)
    gl.disableVertexAttribArray(0)
```