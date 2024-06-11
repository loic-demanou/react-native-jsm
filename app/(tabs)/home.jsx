import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const { data: posts, refetch } = useAppWrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <Text>Home</Text> */}
      <FlatList
        data={ posts }
        // data={[{ id:1, name:"loic"}, { id:2, name:"loic"}, { id:3, name:"loic"}]}
        // data={[]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">Loic</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} 
                className="w-9 h-10"
                resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className="flex-1 w-full pt-5 pb-8">
              <Text className = "text-gray-100 text-lg font-pregular mb-3">Latest videos</Text>

              <Trending posts = {[{ id:1, name:"loic"}, { id:2, name:"loic2"}, { id:3, name:"loic4"}] ?? []} />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title = "No video found"
            subtitle = "Be the first one to upload the video"
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

      />
    </SafeAreaView>
  )
}

export default Home