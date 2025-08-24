import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Star } from "lucide-react";
import { insertSignupSchema, type InsertSignup } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const states = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" }
];

const roles = [
  { value: "homeowner", label: "Homeowner" },
  { value: "contractor", label: "Contractor" }
] as const;

export default function SignupForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InsertSignup>({
    resolver: zodResolver(insertSignupSchema),
    defaultValues: {
      email: "",
      state: "",
      roles: [],
    },
  });

  const watchedRoles = watch("roles");

  const signupMutation = useMutation({
    mutationFn: async (data: InsertSignup) => {
      const response = await apiRequest("POST", "/api/signup", data);
      return response.json();
    },
    onSuccess: () => {
      setLocation("/thank-you");
      queryClient.invalidateQueries({ queryKey: ["/api/signups"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign up. Please try again.",
      });
    },
  });

  const onSubmit = (data: InsertSignup) => {
    signupMutation.mutate(data);
  };

  // Form now submits directly to Formspree - no need for role change handler

  const focusEmailField = () => {
    const emailField = document.querySelector('input[type="email"]') as HTMLInputElement;
    if (emailField) {
      emailField.focus();
    }
  };

  return (
    <section className="mt-10 pt-14 pb-20 w-full max-w-container mx-auto px-4" id="signup">
      <p className="text-center text-muted-text max-w-4xl mx-auto mb-6 leading-relaxed">
        Be the first to experience TradeScout. Get notified when we launch and receive exclusive early access.
      </p>

      <div className="mt-4 mb-4 max-w-4xl mx-auto card-gradient border border-white/6 rounded-xl p-4 shadow-xl shadow-black/25 text-left">
        <span className="block font-black tracking-wide mb-1">For Homeowners & Contractors</span>
        <p className="text-muted-text m-0 leading-relaxed">
          Join the waitlist to get early access to direct connections, verified professionals, and tools that actually work for your projects.
        </p>
      </div>

      <div className="text-center mt-4 mb-2">
        <button 
          onClick={focusEmailField}
          className="inline-flex items-center gap-2.5 brand-gradient text-white px-4 py-3 rounded-xl font-black cursor-pointer shadow-lg shadow-brand/20 hover:-translate-y-0.5 focus:outline-none focus:ring-3 focus:ring-brand/35 transition-transform duration-150"
          data-testid="button-focus-email"
        >
          <Star className="w-4 h-4 opacity-90" />
          Get Early Access
        </button>
      </div>

      <form 
        action="https://formspree.io/f/xovlzjlq" 
        method="POST"
        className="grid grid-cols-1 lg:grid-cols-4 gap-3"
      >
        <div className="lg:col-span-1">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full bg-panel-2 border border-white/8 rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-3 focus:ring-brand/25 focus:border-white/18"
            required
            data-testid="input-email"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="lg:col-span-1">
          <select 
            name="state"
            className="w-full bg-panel-2 border border-white/8 rounded-xl px-4 py-3 text-text appearance-none focus:outline-none focus:ring-3 focus:ring-brand/25 focus:border-white/18 cursor-pointer hover:border-white/20 transition-all duration-200"
            style={{
              paddingRight: "48px",
              backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6,9 12,15 18,9'></polyline></svg>")`,
              backgroundPosition: `calc(100% - 16px) center`,
              backgroundSize: `16px 16px`,
              backgroundRepeat: `no-repeat`
            }}
            data-testid="select-state"
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.value} value={state.value}>{state.label}</option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        <fieldset className="lg:col-span-1 bg-panel-2 border border-white/8 rounded-xl p-3 text-text">
          <legend className="text-xs tracking-wide text-muted-text px-2 mb-2">I am a (select all):</legend>
          <div className="flex flex-wrap gap-2">
            {roles.map(role => (
              <Label 
                key={role.value}
                className="inline-flex items-center gap-2 bg-white/4 border border-white/8 rounded-lg px-3 py-2 cursor-pointer hover:bg-white/6"
              >
                <input
                  type="checkbox"
                  name="roles[]"
                  value={role.value}
                  className="accent-brand"
                  data-testid={`checkbox-${role.value}`}
                />
                <span className="text-sm">{role.label}</span>
              </Label>
            ))}
          </div>
          {errors.roles && (
            <p className="text-red-400 text-sm mt-1">{errors.roles.message}</p>
          )}
        </fieldset>

        <div className="lg:col-span-1">
          <button
            type="submit"
            className="w-full brand-gradient text-white border-none rounded-xl px-4 py-3 font-black cursor-pointer whitespace-nowrap shadow-lg shadow-brand/20 hover:-translate-y-0.5 focus:outline-none focus:ring-3 focus:ring-brand/35 transition-transform duration-150"
            data-testid="button-submit"
          >
            Get Early Access
          </button>
          <input type="hidden" name="_redirect" value="https://info.thetradescout.us/thank-you" />
          <input type="hidden" name="_subject" value="New TradeScout Early Access Signup" />
        </div>
      </form>

      <p className="text-center text-muted-text text-sm mt-3 leading-relaxed">
        Prize details will be sent to your registered email address.
      </p>
    </section>
  );
}
