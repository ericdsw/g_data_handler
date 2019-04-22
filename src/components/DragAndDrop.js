import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    dragWrapper:{
        position: 'relative',
    },
    dragOverlay: {
        border: 'dashed grey 4px',
        backgroundColor: 'rgba(255,255,255,0.8)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
    },
    dragOverlayContent: {
        position: 'absolute',
        top: '50%',
        right: 0,
        left: 0,
        textAlign: 'center',
        color: 'grey',
        fontSize: 36,
    }
})


class DragAndDrop extends React.Component {

    dropRef = React.createRef()
    dragCounter = 0

    constructor(props) {
        super(props)
        this.state = {
            dragging: false
        }
    }

    componentDidMount() {
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    handleDrag = (event) => {
        event.preventDefault()
        event.stopPropagation()
    }

    handleDragIn = (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.dragCounter++
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            this.setState({dragging: true})
        }
    }

    handleDragOut = (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.dragCounter--
        if (this.dragCounter > 0) {
            return
        }
        this.setState({dragging: false})
    }

    handleDrop = (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.setState({dragging: false})
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            this.props.handleDrop(event.dataTransfer.files)
            event.dataTransfer.clearData()
            this.dragCounter = 0
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div ref={this.dropRef} className={classes.dragWrapper}>
                {
                    this.state.dragging &&
                    <div className={classes.dragOverlay}>
                        <div className={classes.dragOverlayContent}>
                            <div>Drop here :)</div>
                        </div>
                    </div>
                }
                {this.props.children}
            </div>
        )
    }
}

export default withStyles(styles)(DragAndDrop)
