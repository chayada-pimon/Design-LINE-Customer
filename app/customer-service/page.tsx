import { EmployeeServicesSection } from "@/components/home/employee-services-section"
import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
import { CustomerServiceAttendanceSection } from "@/components/customer-service/customer-service-attendance-section"
import { CustomerServiceMenuSection } from "@/components/customer-service/customer-service-menu-section"
import { CustomerServiceProfileSection } from "@/components/customer-service/customer-service-profile-section"

export default function CustomerServicePage() {
  return (
    <HomeLayout>
      <HomeHeader />
        <PageHeading>หน้าหลัก Customer Service</PageHeading>
       <CustomerServiceProfileSection />
       <CustomerServiceAttendanceSection />
       <CustomerServiceMenuSection />
        <EmployeeServicesSection />
    </HomeLayout>
  )
}
