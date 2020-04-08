const express = require('express')
const router = new express.Router()
const Account = require('../models/account')

router.post('/account', async (req, res)=>{
    const account = new Account(req.body)

    try{
        await account.save()
        res.status(201).send(account)
    }
    catch(e){
        res.status(400).send(account)
    }
})

router.get('/account', async (req,res)=>{
    try{
        const accounts = await Account.find({})
        res.send(accounts)
    } catch (e){
        res.status(500).send()
    }
})

router.get('/account/:id', async (req,res)=>{
    try{
        const account = await Account.findById({_id: req.params.id})
        if(account){
            res.send(account)
        } else{
            res.status(404).send()
        }
        
    } catch (e){
        res.status(500).send()
    }
})

router.patch('/account/debit/:id', async (req,res)=>{
    try{
        const account = await Account.findById({_id:req.params.id})
        console.log(req.body)
        if(account){
            const depositLeft = account.deposit - req.body.amount
            if(depositLeft>0){
                account[deposit] = depositLeft
                await account.save()
                res.send(account)
            } else{
                res.status(400).send('The amount provided cannot be debited from the account')
            }
        }else{
            res.status(404).send()
        }    
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/account/credit/:id', async (req,res)=>{
    try{
        const account = await Account.findById({_id:req.params.id})
        if(account){
            const accountBalance = account.deposit + req.body.amount
            account[deposit] = accountBalance
            await account.save()
            res.send(account)
        }else{
            res.status(404).send()
        }
    }   
    catch(e){
        res.status(500).send()
    }
})

router.patch('/account/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['acno', 'name', 'deposit']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error:"Invalid Updates"})
    }

    try{
        const account = await Account.findById(req.params.id)
        console.log(account)
        updates.forEach((update)=>{
            account[update] = req.body[update]
        })
        await account.save()
        res.send(account)
    }catch(e){
        res.status(500).send()
    }
})

router.delete('/account/:id', async (req,res)=>{
    try{
        const account = await Account.findByIdAndDelete(req.params.id)
        if(account){
            res.send(account)
        }else{
            res.status(404).send()
        }
    }catch(e){
        res.status(500).send()
    }
})

module.exports= router;