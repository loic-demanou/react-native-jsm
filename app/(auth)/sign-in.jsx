import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.email || !form.password) {
            return Alert.alert('Error', "Please fill in all the fields");
        }
        setIsSubmitting(true);

        try {
            await signIn(form.email, form.password);

            //set it to global state

            router.replace('/home');

        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
        
        // return alert('Submitted')
    }

    return (
        <SafeAreaView className = "bg-primary h-full">
            <ScrollView className="">
                <View className="w-full flex justify-center min-h-[85vh] px-4 my-5">
                    <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
                    <Text className="text-white text-2xl mt-10 font-psemibold">Log in to Aora</Text>

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText = {(e) => setForm({...form, email:e})}
                        otherStyles = "mt-7"
                        keybordType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText = {(e) => setForm({...form, password:e})}
                        otherStyles = "mt-7"
                    />

                    <CustomButton
                        title="Sign In"
                        value={form.password}
                        handlePress = {submit}
                        containerStyles = "mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Don't have an account ?</Text>
                        <Link href={'/sign-up'} className='text-secondary text-lg font-psemibold'>Sign Up</Link>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn