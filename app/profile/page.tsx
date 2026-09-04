import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
import { ProfileView } from "@/components/profile/profile-view"

export default function ProfilePage() {
  return (
    <HomeLayout>
      <Header backHref="/" showProfileCard={false} title="โปรไฟล์ของฉัน" />
      <ProfileView />
    </HomeLayout>
  )
}
