export default function drag (id) {
  $(document).init(function (){
      $('.ui.form').form({
          user:{
            identifier:'user',
            rules:[{
              type:'empty',
              prompt:'请输入用户名'
            }]
          },
          pwd:{
            identifier: 'pwd',
            rules:[
              {
                type:'empty',
                prompt:'请输入密码'
              }
            ]
          },
          repwd:{
            identifier:'repwd',
            rules:[
              {
                type:'empty',
                prompt:'请重复输入密码'
              }
            ]
          }
        },
        {
          inline:true,
          on:'blur'
        }
      )

    }

  )
}

