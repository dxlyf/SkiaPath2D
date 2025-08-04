
import  {Path2D,PathBuilder,PathStroker,LineCap,LineJoin} from 'skia-path2d'

var canvas=document.getElementById('myCanvas')! as HTMLCanvasElement
var ctx=canvas.getContext('2d')!


ctx.clearRect(0,0,canvas.width,canvas.height)

let path=new Path2D()

path.arc(100,100,50,0,2*Math.PI,false)

path.toCanvas(ctx as any)
ctx.fill()

let path2=new Path2D()

path2.arc(300,100,50,0,1*Math.PI,false)

let stroker=new PathStroker()
let strokerPath=stroker.stroke(path2.getPath(),{
    strokeWidth:20,
    lineJoin:LineJoin.Round,
    lineCap:LineCap.Round,
    miterLimit:10
})
strokerPath.toCanvas(ctx as any)
ctx.fill()

canvas.addEventListener('pointerdown',e=>{
    if(path.contains(e.offsetX,e.offsetY)){
        console.log('点击在路径内')
    }
    if(strokerPath.contains(e.offsetX,e.offsetY)){
        console.log('点击在描边内')
    }
})