import { ElNotification } from 'element-plus'
import { h } from 'vue'

declare interface Notice {
  text: string
  type?: '' | 'warning' | 'success' | 'info' | 'error'
  title?: string
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  duration?: number
}

const Notification = (obj: Notice) => {
  ElNotification({
    title: obj.title,
    message: h('i', { style: 'color: teal' }, obj.text),
    type: obj.type,
    duration: obj.duration,
    position: obj.position
  })
}

export default Notification
