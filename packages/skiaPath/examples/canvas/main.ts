
// @ts-ignore
// @ts-nocheck
import * as SkPath2d from '../../src'

function setSize(canvas, dpr, width, height) {
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

}
const canvas0 = document.querySelector('.native-path2d canvas')
const ctx0 = canvas0.getContext('2d')
const canvas1 = document.querySelector('.skia-path2d canvas')
const ctx1 = canvas1.getContext('2d')

const dpr = window.devicePixelRatio || 1

class BaseExample {
    desc=''
    settings = {}
    constructor(parent) {
        this.parent = parent

    }
    createGui(gui) {
        Object.keys(this.settings).forEach(key => {
            gui.add(this.settings, key)
            let desc=Object.getOwnPropertyDescriptor(this, key)
            if(!desc){
                Object.defineProperty(this, key, {
                    get: () => {
                        return this.settings[key]
                    }
                })
            }
        })

    }
    onChange = () => {
        this.parent.refresh()
    }
    enter(gui) {

    }
    draw() {

    }
    exit() {

    }
}
class Rect extends BaseExample {
    name = 'Rect'
    settings = {
        x: 100,
        y: 100,
        w:100,
        h:100
    }
    draw(path) {
        path.rect(this.x, this.y, this.w,this.h)
    }
}
class Ellipse extends BaseExample {
    name = 'Ellipse'
    settings = {
        x: 100,
        y: 100,
        rx: 50,
        ry: 70,
        rotation: 0,
        startAngle: 0,
        endAngle: 360,
        ccw: false
    }
    draw(path) {
        path.ellipse(this.x, this.y, this.rx, this.ry, this.rotation / 180 * Math.PI, this.startAngle / 180 * Math.PI, this.endAngle / 180 * Math.PI, this.ccw)
    }
}
class RoundRect extends BaseExample {
    name = 'RoundRect'
    settings = {
        x: 100,
        y: 100,
        w: 100,
        h: 100,
        lt: 0,
        rt: 0,
        bl: 0,
        br: 0,
    }
    draw(path) {
        path.roundRect(this.x, this.y, this.w, this.h, [this.lt, this.rt, this.bl, this.br])
    }
}
class Arc extends BaseExample {
    name = 'Arc'
    settings = {
        x: 100,
        y: 100,
        r: 50,
        startAngle: 0,
        endAngle: 360,
        ccw: false
    }
    draw(path) {
        path.arc(this.x, this.y, this.r, this.startAngle / 180 * Math.PI, this.endAngle / 180 * Math.PI, this.ccw)
    }
}
class ArcTo extends BaseExample {
    name = 'ArcTo'
    settings = {
        x: 100,
        y: 100,
        x1: 200,
        y1: 100,
        x2: 200,
        y2: 200,
        r: 50
    }
    draw(path) {
        path.moveTo(this.x, this.y)
        path.arcTo(this.x1, this.y1, this.x2, this.y2, this.r)
    }
}
class EllipseArcTo extends BaseExample {
    name = 'EllipseArcTo'
    desc='Similar to SVG path A command'
    settings = {
        x1: 100,
        y1: 100,
        x2: 200,
        y2: 100,
        rx:50,
        ry:50,
        xAxisRotation:0,
        largeArcFlaag:false,
        sweepFlag:false,
    }
    draw(path,type) {
        if(type==2){
            path.ellipseArc(this.x1, this.y1, this.x2, this.y2, this.rx,this.ry,this.xAxisRotation/180*Math.PI,this.largeArcFlaag,this.sweepFlag)
        }else{
            return new Path2D(`M${this.x1},${this.y1} A${this.rx},${this.ry},${this.xAxisRotation},${this.largeArcFlaag?1:0},${this.sweepFlag?1:0},${this.x2},${this.y2}`)
        }
    }
}
class Path extends BaseExample {
    name = 'Path'
    desc='Press the middle mouse button to add a point'
    points = [[100, 100], [200, 100], [150, 200]]
    settings = {
        closePath: false,
    }
    forceFill = true
    onAddPoint = (e) => {
        if(e.buttons===4){
            this.points.push([e.offsetX, e.offsetY])
             this.onChange()
        }

    }
    clearPoints = () => {
        this.points.length = 0
        this.onChange()

    }
    createGui(gui) {
        super.createGui(gui)
        gui.add(this, 'clearPoints')
    }
    enter() {
        canvas1.addEventListener('pointerdown', this.onAddPoint)

    }
    exit() {
        this.points.length = 0
    }
    draw(path, type) {

        this.points.forEach((d, i) => {
            if (i == 0) {
                path.moveTo(d[0], d[1])
            } else {
                path.lineTo(d[0], d[1])
            }
        })
        if (this.closePath) {
            path.closePath()
        }

    }
}

class SvgPath extends BaseExample {
    name = 'SvgPath'

    settings = {
        d:'M100 200C150 100 200 100 300 200'
    }
    draw(path:SkPath2d.Path2D,type) {
        if(type==2){
            path.getPath().reset()
            path.fromSvgPath(this.d)
        }else{
            return new Path2D(this.d)
        }
    }
    
    
}
class Main {
    static examples = [SvgPath,Arc,Rect,Ellipse,EllipseArcTo, RoundRect, ArcTo, Path]
    examples = []
    currentExample = null
    example = ''
    dirty = true
    constructor() {
        Main.examples.forEach(Example => {
            this.examples.push(new Example(this))
        })
        this.gui = new lil.GUI()
        this.example = this.examples[0].name
    }
    animationId = 0
    drawMode = 'stroke'
    lineWidth = 10
    lineJoin = 'miter'
    lineCap = 'butt'
    enableDash = false
    dashArray='5,10'
    dashOffset=0
    showOutline=false
    boundsAutoOffset = false
    showBounds = false
    currentPath=null

    start() {
        let gui = this.gui
        gui.onChange(()=>{
            this.refresh()
        })
        gui.add(this, 'example', this.examples.map(d => d.name)).onChange((v) => {
            this.setExampleWithName(v)
        })
        gui.add(this, 'drawMode', ['fill', 'stroke'])
       const guiLineWidth= gui.add(this, 'lineWidth', 1, 20, 1)
        gui.add(this, 'lineJoin', ['bevel', 'miter', 'round'])
        gui.add(this, 'lineCap', ["butt", "round", "square"])

        gui.add(this, 'enableDash')
        gui.add(this, 'dashArray')
        gui.add(this, 'dashOffset',0,100)


        gui.add(this, 'showOutline').onChange(()=>{
             if(this.lineWidth<5){
                guiLineWidth.setValue(5)
             }
             this.refresh()
        })
        gui.add(this, 'showBounds')
        gui.add(this, 'boundsAutoOffset')
        this.setExampleWithName(this.example)
        const hitTest=document.querySelector('#hitTest')
        canvas1.addEventListener('pointerdown', (e) => {
            let x=e.offsetX,y=e.offsetY
            hitTest.innerHTML=`miss`
            let path=this.currentPath
            //"evenodd" | "nonzero"
            if(path&&path.contains(x,y)){
                hitTest.innerHTML=`hit`
            }
        })
        let loop = () => {
            this.update()
            this.animationId = requestAnimationFrame(loop)

        }
        this.animationId = requestAnimationFrame(loop)
    }
    stop() {
        cancelAnimationFrame(this.animationId)
    }
    setExampleWithName(name) {
        let example = this.examples.find(d => d.name === name)
        if (example) {
            this.showExample(example)
        }
    }
    showExample(example) {
        if (this.currentExample !== example) {
            let gui = this.gui.addFolder(example.name)

            if (this.currentExample) {
                this.currentExample.gui.destroy()
                this.currentExample.exit()
            }

            example.gui = gui
            this.currentExample = example
            example.createGui(gui)
            example.enter(gui)
            document.querySelector('#desc').innerHTML = example.desc

            this.refresh()
        }
    }
    update() {
        if (this.dirty && this.currentExample) {
            this.draw()
            this.dirty = false
        }
    }
    refresh = () => {
        this.dirty = true
    }
    drawOnce(ctx, callback) {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.save()
        ctx.scale(dpr, dpr)
        callback(ctx);
        ctx.restore()
    }
    draw() {
        let currentExample = this.currentExample
        // 原生
        let path = new Path2D()

        let skiaPath = new SkPath2d.Path2D()
        this.currentPath=skiaPath
        this.drawOnce(ctx0, (ctx:CanvasRenderingContext2D) => {
            ctx.save()
            ctx.beginPath()
            path=currentExample.draw(path, 1)||path;
            ctx.strokeStyle = 'red'
            ctx.fillStyle = 'red'
            ctx.lineWidth = this.lineWidth
            ctx.lineJoin = this.lineJoin
            ctx.lineCap = this.lineCap
            if(this.enableDash) {
                ctx.setLineDash(this.dashArray.split(',').map(Number))
                ctx.lineDashOffset=this.dashOffset
            }

            if (this.drawMode === 'fill') {
                ctx.fill(path)
            } else {
                ctx.stroke(path)
            }
            ctx.restore()

        })
        this.drawOnce(ctx1, (ctx) => {
            ctx.save()
            ctx.beginPath()
            currentExample.draw(skiaPath,2)
            if(this.enableDash) {
                let dashData=this.dashArray.split(',').map(Number)
                // 如果是奇数，就重复
                if(dashData.length%2!==0){
                    dashData=dashData.concat(dashData)
                }
                let dash=new SkPath2d.PathStrokeDash(dashData, this.dashOffset)
                let new_dash_path=dash.dash(skiaPath.getPath())
                if(new_dash_path){
                    skiaPath.getPath().copy(new_dash_path)
                }
            }
            if(this.drawMode === 'stroke') {
                let stroker = new SkPath2d.PathStroker()
                let newPath = stroker.stroke(skiaPath.getPath(), {
                    strokeWidth: this.lineWidth,
                    lineJoin: this.lineJoin,
                    lineCap: this.lineCap,
                    miterLimit: 10,

                })
                skiaPath.getPath().copy(newPath)
            }
            ctx.strokeStyle = 'blue'
            ctx.fillStyle = 'blue'

            skiaPath.toCanvas(ctx)
            if(this.drawMode === 'stroke'&&this.showOutline){
                ctx.stroke()
            }else{
                ctx.fill()
            }
        
            ctx.restore()
            if (this.showBounds) {
                let bounds = skiaPath.computeTightBounds()
                if(this.boundsAutoOffset&&this.drawMode!=='fill'&&!currentExample.forceFill){
                    bounds.outset(this.lineWidth / 2, this.lineWidth / 2)
                }
                ctx.strokeStyle = 'yollow'
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(bounds.left, bounds.top)
                ctx.lineTo(bounds.right, bounds.top)
                ctx.lineTo(bounds.right, bounds.bottom)
                ctx.lineTo(bounds.left, bounds.bottom)
                ctx.closePath()
                ctx.stroke()
            }
        })

    }
}
let main = new Main()
main.start()

function resize() {
    setSize(canvas0, dpr, 400, 400)
    setSize(canvas1, dpr, 400, 400)
    main.refresh()
}
window.addEventListener('resize', resize)
resize()
