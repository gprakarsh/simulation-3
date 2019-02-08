const bcrypt = require('bcryptjs')

module.exports={
    register: async (req, res) => {
        const { username, password } = req.body
        const { session } = req
        const db = req.app.get('db')

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.user.register([username, hash])
        
        newUser = newUser[0]  
        session.user = { ...newUser};

        res.status(201).send(session.user)
    }, 
    login: async (req, res) => {
        // console.log('login endpoint hit')
        const { username, password } = req.body
        const db = req.app.get('db')
        const { session } = req
        let user = await db.user.login(username)
        user = user[0]
        // console.log({user})
        if (!user) {
            return res.sendStatus(404)
        }
        const foundUser = bcrypt.compareSync(password, user.password)
        if (foundUser) {
            delete user.password
            session.user = user
            res.status(200).send(session.user)
        }
        else {
            res.status(401).send('Access Denied! Wrong Password!')
        }

    },
    logout:(req,res)=>{
        req.session.destroy()
        res.sendStatus(200);
    }, 
    getPosts: async (req,res) => {
        const {id} = req.session.user
        // console.log(id)
        let {search,userposts} = req.query 
        const db = req.app.get('db')       
        // console.log({userposts})
        // console.log({search})
        if(userposts && search){
            console.log('hit1')
            let posts = await db.posts.get_posts1([search+'%'])
            res.send(posts)
        }
        else if(!userposts && !search) {
            console.log('hit2')
            let posts = await db.posts.get_posts2([id])
            res.send(posts[0])
        }
        else if(!userposts && search) {
            console.log('hit3')
            let posts = await db.posts.get_posts3([id,search+'%'])
            res.send(posts)
        }
        else{
            console.log('hit4')
            let posts = await db.posts.get_posts4()
            res.send(posts)
        }
    },
    getPost:async(req,res)=>{
        const {id} = req.params
        const db = req.app.get('db')

        let post = await db.posts.get_post([id])
        res.send(post[0])
    },
    createPost:async(req,res)=>{
        const {id} = req.session.user
        console.log({id})
        const db = req.app.get('db')
        const {post_title,post_image,post_text} = req.body
        console.log({post_title})
        db.posts.create([id,post_title,post_image,post_text])
        res.sendStatus(201)
    }
    
}





























