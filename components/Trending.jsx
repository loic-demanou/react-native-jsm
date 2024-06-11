import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Trending = ({ posts }) => {
    return (
        <View>
            <FlatList 
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text className= "text-3xl text-white">{item.name}</Text> 
                )}
                horizontal
            />
        </View>
    )
}

export default Trending