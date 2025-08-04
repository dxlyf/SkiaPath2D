
import  {Path2D,PathBuilder,PathStroker,LineCap,LineJoin} from '../../src'

var canvas=document.getElementById('myCanvas')! as HTMLCanvasElement
var ctx=canvas.getContext('2d')!


ctx.clearRect(0,0,canvas.width,canvas.height)

function drawBounds(bounds:any){

    ctx.strokeStyle = 'yollow'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(bounds.left,bounds.top)
    ctx.lineTo(bounds.right,bounds.top)
    ctx.lineTo(bounds.right,bounds.bottom)
    ctx.lineTo(bounds.left,bounds.bottom)
    ctx.closePath()
    ctx.stroke()

}
let path=new Path2D()


ctx.beginPath()
path.arc(100,100,50,0,2*Math.PI,false)
path.toCanvas(ctx as any)
ctx.fill()
let bounds=path.computeTightBounds()

drawBounds(bounds)

let path2=new Path2D()
ctx.beginPath()
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