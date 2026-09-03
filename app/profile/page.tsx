import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
import { ProfileView } from "@/components/profile/profile-view"

export default function ProfilePage() {
  return (
    <HomeLayout>
      <HomeHeader backHref="/" showDrawer={false} />
      <PageHeading>โปรไฟล์ของฉัน</PageHeading>
      <ProfileView />
    </HomeLayout>
  )
}
