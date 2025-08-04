# SkiaPath2D
从Skia源码中提取Path2D、PathStrore和isPointInPath相关的核心代码，并用typescript重写
PathBuilder:是核心类,移植自Skia的PathBuilder类，里面部分方法有重写，去掉一些冗余代码，简化逻辑。

别外添加Path2D对象，用来和浏览器的原生Path2D对象兼容。测试绘制效果与Path2D是一致的，包括像arcTo,arc,ellipse，的startAngle,sweepAngle,rotationAngle参数的一致性支持。



Path2D增加方法：ellipseArc、conicTo、contains


## 包围盒
```typescript
    path.getBounds() // 包围盒包含曲线的控制点
    path.computeTightBounds()// 不包含曲线控制点
```
## 命中测试
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
## 在Canvas中使用
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
## 在Svg中使用
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
## 在Webgl中使用
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