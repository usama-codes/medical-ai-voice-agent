"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Settings,
  Bell,
  CreditCard,
} from "lucide-react";

function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="text-muted-foreground">Loading profile...</div>
        </div>
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="pb-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-8 h-8 text-primary" />
          <h1 className="font-bold text-3xl md:text-4xl text-foreground">
            Profile Settings
          </h1>
        </div>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </header>

      {/* Profile Information Card */}
      <section className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative">
            <img
              src={user.imageUrl || "/default-avatar.png"}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover ring-4 ring-primary/20"
            />
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
              <Shield className="w-5 h-5" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-muted-foreground mt-1">
                @{user.username || user.id.slice(0, 8)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="px-3 py-1">
                Active User
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Verified Email
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-muted-foreground text-xs">Email</div>
                  <div className="font-medium">
                    {user.primaryEmailAddress?.emailAddress}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-muted-foreground text-xs">
                    Member Since
                  </div>
                  <div className="font-medium">{joinedDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Settings */}
        <section className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-foreground">
                Account Settings
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage your account details
              </p>
            </div>
          </div>
          <ul className="space-y-3 mt-4">
            <li className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">
                Update Profile Picture
              </span>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">Change Password</span>
              <Button variant="ghost" size="sm">
                Update
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">
                Two-Factor Authentication
              </span>
              <Button variant="ghost" size="sm">
                Setup
              </Button>
            </li>
          </ul>
        </section>

        {/* Notification Preferences */}
        <section className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-foreground">
                Notifications
              </h3>
              <p className="text-sm text-muted-foreground">
                Configure your alerts
              </p>
            </div>
          </div>
          <ul className="space-y-3 mt-4">
            <li className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">Email Notifications</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">On</span>
                <div className="w-10 h-6 bg-primary rounded-full"></div>
              </div>
            </li>
            <li className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">
                Consultation Reminders
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">On</span>
                <div className="w-10 h-6 bg-primary rounded-full"></div>
              </div>
            </li>
            <li className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">Report Updates</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Off</span>
                <div className="w-10 h-6 bg-muted rounded-full"></div>
              </div>
            </li>
          </ul>
        </section>

        {/* Billing Information */}
        <section className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-foreground">
                Billing & Plans
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage subscriptions
              </p>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">
                  Current Plan
                </span>
                <Badge variant="default">Free Tier</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                1 consultation per month included
              </p>
            </div>
            <Button variant="default" className="w-full">
              Upgrade to Pro
            </Button>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-foreground">
                Privacy & Security
              </h3>
              <p className="text-sm text-muted-foreground">Control your data</p>
            </div>
          </div>
          <ul className="space-y-3 mt-4">
            <li className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">Data Privacy Settings</span>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">Download My Data</span>
              <Button variant="ghost" size="sm">
                Export
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium text-destructive">
                Delete Account
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
