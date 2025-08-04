# SkiaPath2D
从Skia源码中提取Path2D、PathStrore和isPointInPath相关的核心代码，并用typescript重写
PathBuilder:是核心类,移植自Skia的PathBuilder类，里面部分方法有重写，去掉一些冗余代码，简化逻辑。

别外添加Path2D对象，用来和浏览器的原生Path2D对象兼容。测试绘制效果与Path2D是一致的，包括像arcTo,arc,ellipse，的startAngle,sweepAngle,rotationAngle参数的一致性支持。



Path2D增加方法：ellipseArc、conicTo、contains

## 核心类
有`PathBuilder``Path2D`,`PathStroker`,`ProxyPath2D`几个：

### PathBuilder
路径生成，核心代码移植自Skia的PathBuilder类，但更简化
## Path2D
内部相当代理PathBuilder，但不直接暴露PathBuilder的方法。而是封装了一层，与浏览器的原生Path2D差不多，圆弧、椭圆、圆角矩形、保持与浏览相同效果和等同参数。
另外增加`conitTo、ellipseArc、getBounds、computeTightBounds,contains,fromSvgPath,toSvgPath,toPath2D,toCanvas`等方法。`contains`方法完全移植skia的，所以对图形的命中计算与浏览是一致的。
特别是复杂图形，有lineJoin和lineCap、curveLine等都支持。比如：`ellipseArc`,`conicTo`,等。
### PathStroker
根据路径生成描边轮廓，核心代码移植自Skia的PathStroker类。
### ProxyPath2D
`ProxyPath2D`是`Path2D`的轻量级代理，它只是存储命令和坐标，并没有生成实际的渲染路径。如：`ellipse`方法，`Path2D`会通过一系统计算用曲线近似,而`ProxyPath2D`则直接存储命令和坐标。如下：`PathCommand<'E', [number, number, number, number, number, number, number, boolean]>`



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
